import { memoryStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

export const multerOptions = {
  storage: memoryStorage(), // Store files in memory
  limits: {
    fileSize: 20 * 1024 * 1024, // 50MB size limit
  },
  fileFilter: (req, file, cb) => {
    // Allowed field names
    const allowedFields = ['image','attachment', 'attachments','logoMedia','authorizationFile','registeringFile','taxInformation','deliveryAddress','employeesNumber'];

    // Check if the fieldname is allowed
    if (allowedFields.some((field) => file.fieldname.startsWith(field))) {
      cb(null, true); // Accept file
    } else {
      cb(
        new BadRequestException(
          `Unexpected field '${file.fieldname}'. Allowed fields are: ${allowedFields.join(', ')}`,
        ),
        false,
      );
    }
  },
};
