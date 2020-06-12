import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  constructor() {}
  imgUrl: any;
  error: string;

  @Output() fileUploaded = new EventEmitter<any>();

  ngOnInit(): void {}

  sendToPreview(file: any) {
    if (file.files[0].length === 0) {
      return;
    }
    const fileType = file.files[0].type;
    if (fileType.match(/image\/*/) === null) {
      this.error = 'Images supported only';
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file.files[0]);
    fileReader.onload = (event) => {
      this.imgUrl = fileReader.result;
      this.fileUploaded.emit(fileReader.result);
    };
  }
}
