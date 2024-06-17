import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class FileDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsFile({ message: 'expected input is a file' })
  @IsNotEmpty()
  file: MemoryStoredFile;
}

export class FilesDto {
  @ApiPropertyOptional({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsArray({ message: 'expected input is an array of files' })
  @IsFile({ each: true })
  @IsOptional()
  files?: MemoryStoredFile[] | any[];
}
