export interface User{
    firstName: string,
    lastName:string,
    email:string,
    role:string,
    accessList:[],
    creationdeletionPrivilege:Boolean,
    sharedResources:[],
    isAdmin:Boolean
  }

  export interface SystemUser{
    name: string,
    email:string,
    entity:string,
    entityAccount:boolean
  }

  export interface Section{
    id: string,
    name: string,
    dateCreated: string
  }

  export interface FileObject{
      id:string,
      name:string,
      itemType:"file",
      contentType:string,
      url:string,
      lastUploadUser:string,
      lastUpdated:string,
      parentId:string,
      owner:string
  }

  export interface Directory{
      id: string,
      name:string,
      itemType:"folder",
      dateCreated:string,
      parentId:string,
      lock:Boolean
      
  }

  export class FileUpload {
    name: string;
    url: string;
    file: File;
   
    constructor(file: File) {
      this.file = file;
    }
  }

  export interface DocumentApprovalObject{
     id:string,
     documentId:string,
     documentName:string,
     documentUrl:string,
     requestMessage:string,
     senderId:string,
     dateCreated:string,
     latestApprovalDate:string,
     title:string,

     approvalStatus:boolean,
     approverId:string,
     dateApproved:string,
     returnedDocumentId :string,
     returnedDocumentUrl:string,
     approvedMessage:string    
  }

  export interface ApprovalResponse{
     requestId:string,
     approvalResult:number,
     approverId:string,
     dateApproved:string,
     returnedDocument :any,
     approvedMessage:string
  }

  export interface ApprovalRequest{
     documentId:string,
     documentName:string,
     documentUrl:string,
     requestMessage:string,
     senderId:string,
     senderName:string,
     dateCreated:string,
     latestApprovalDate:string,
     approverId:string
 }

 