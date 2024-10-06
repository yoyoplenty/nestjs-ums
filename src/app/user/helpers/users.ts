import * as excelToJson from 'convert-excel-to-json';
import { MemoryStoredFile } from 'nestjs-form-data';

export const getFileUserDetails = (file: MemoryStoredFile): any[] => {
  const result: Record<string, Record<string, string>[]> = excelToJson({
    source: file.buffer,
    columnToKey: {
      A: '_id',
      B: 'firstName',
      C: 'lastName',
      D: 'email',
    },
    header: { rows: 1 },
  });

  const userMailingDetails = Object.values(result)[0];

  const userDetails: any[] = userMailingDetails.map((mailingUserDetails: Record<string, string>) => {
    return {
      _id: mailingUserDetails._id,
      email: mailingUserDetails.email,
      lastName: mailingUserDetails.lastName,
      firstName: mailingUserDetails.firstName,
    };
  });

  return userDetails;
};

export function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}
