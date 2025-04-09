import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { PaylatRequest, PaylatRequestDocument } from './models/paylat-request.schema';

@Injectable()
export class PaymentService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(PaylatRequest.name) private paylatRequestModel: Model<PaylatRequestDocument>,
  ) {}

  async processPaylatRequest(
    data: { name: string; email: string; phoneNumber?: string; company: string }
  ) {
    // Save request to MongoDB
    const newRequest = new this.paylatRequestModel({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber || null,
      company: data.company,
      status: 'pending',
    });

    await newRequest.save();

    // Prepare email content
    const mailOptions: any = {
      to: 'deemsulaman8@gmail.com',
      subject: 'Pay Later Request',
      template: 'payment-request.ejs',
      context: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber || 'N/A',
        company: data.company,
      },
    };

    await this.mailerService.sendMail(mailOptions);
     // Email Confirmation to User
     const userMailOptions = {
      to: data.email,
      subject: 'Confirmation: Your Pay Later Request',
      template: 'confirmation-email.ejs', // New email template
      context: {
        name: data.name,
        company: data.company,
      },
    };

    await this.mailerService.sendMail(userMailOptions);
  }
  async getAllPaylatRequests() {
    try {
      return await this.paylatRequestModel.find().sort({ createdAt: -1 }).exec();
    } catch (error) {
      console.error('Error fetching Paylat requests:', error);
      throw new Error('Failed to retrieve Paylat requests.');
    }
  }
  async acceptPaylatRequest(id: string) {
    const paylat = await this.paylatRequestModel.findById(id);
    if (!paylat) {
      throw new NotFoundException("Paylat request not found");
    }

    // ✅ Update status to "approved"
    paylat.status = 'approved';
    await paylat.save();

    // 📧 Send confirmation email
    await this.mailerService.sendMail({
      to: paylat.email,
      subject: "تمت الموافقة على طلب Paylat الخاص بك" ,
      template: "paylat-approved.ejs",
      context: { name: paylat.name, company: paylat.company },
    });

    return paylat;
  }
  async refusePaylatRequest(id: string, reason: string) {
    const paylat = await this.paylatRequestModel.findById(id);
    if (!paylat) {
      throw new NotFoundException("Paylat request not found");
    }

    // ✅ Update status to "rejected" and store reason
    paylat.status = 'rejected';
    paylat.rejectionReason = reason;
    await paylat.save();

    // 📧 Send rejection email
    await this.mailerService.sendMail({
      to: paylat.email,
      subject:"تم رفض طلب Paylat الخاص بك",
      template: "paylat-rejected.ejs",
      context: { name: paylat.name, company: paylat.company, reason },
    });

    return paylat;
  }
}
