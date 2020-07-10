import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileViewModel } from '../models/file.model';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  constructor() {}
  fileUrl: any;
  fileType: string;
  error: string;
  isImage: boolean;
  @Output() fileUploaded = new EventEmitter<any>();

  ngOnInit(): void {}

  sendToPreview(file: any) {
    if (file.files[0].length === 0) {
      return;
    }
    this.fileType = file.files[0].type;
    if (this.fileType.match(/image\/*/) !== null) {
      this.isImage = true;
    } else if (this.fileType.match(/video\/*/) !== null) {
      this.isImage = false;
    } else {
      this.error = 'Images and videos supported only';
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file.files[0]);
    fileReader.onload = (event) => {
      this.fileUrl = fileReader.result;
      const newFile = new FileViewModel(
        file.files[0].name,
        file.files[0].type,
        this.fileUrl
      );
      this.fileUploaded.emit(newFile);
    };
  }
}
