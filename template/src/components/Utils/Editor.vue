<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <form action="">
            <input name="" type="text" class="form-control" placeholder="Title" v-model="title"/>
            <div class="icon">
              <button id="title" class="btn btn-outline-secondary" @click="onClick"><i class="fa fa-header" aria-hidden="true"></i></button>
              <button id="bold" class="btn btn-outline-secondary" @click="onClick"><i class="fa fa-bold" aria-hidden="true"></i></button>
              <button id="italic" class="btn btn-outline-secondary" @click="onClick"><i class="fa fa-italic" aria-hidden="true"></i></button>
              <button id="insertLink" class="btn btn-outline-secondary" @click="onClick"><i class="fa fa-link" aria-hidden="true"></i></button>
              <button id="insertImage" class="btn btn-outline-secondary" @click="onClick" data-toggle="modal" data-target="#myModal"><i class="fa fa-file-picture-o" aria-hidden="true"></i></button>
              <button id="insertTable" class="btn btn-outline-secondary" @click="onClick"><i class="fa fa-table" aria-hidden="true"></i></button>
              <button id="numList" class="btn btn-outline-secondary" @click="onClick"><i class="fa fa-list-ol" aria-hidden="true"></i></button>
              <button id="bulList" class="btn btn-outline-secondary" @click="onClick"><i class="fa fa-list-ul" aria-hidden="true"></i></button>
              <button id="horizontalline" class="btn btn-outline-secondary" @click="onClick"><i class="fa fa-minus" aria-hidden="true"></i></button>
            </div>
            <textarea id="" name="" class="content" v-model="content" ref="inputContent"></textarea>
            <button type="submit" class="btn btn-outline-primary" @click="validateForm">{{$t("Submit")}}</button>
            <button type="cancel" class="btn btn-outline-secondary">{{$t("Cancel")}}</button>
          </form>
        </div>
        <div class="col-md-6 show">
          <div id="markdown" v-html="viewcontent"></div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <upload-dialog @resImage="gotImage"></upload-dialog>

  </div>
</template>


<script>
 import Remarkable from 'remarkable';
 import UploadImage from '../Dialog/Upload-Image.vue';
 import api from '@/services/api';

 
 export default {
   name: 'Editor',
   data() {
     return {
       title: '',
       content: '',
       showImageModal: false,
       resImage: ''
     }
   },
   components: {
     'upload-dialog': UploadImage
   },
   computed: {
     viewcontent() {
       return this.renderContent();
     }
   },
   methods: {
     validateForm(event) {
       const {title, content} = this;
       if (title && content) event.preventDefault();
       this.$emit('editorValue', { title: title, content: content});
       this.title = '';
       this.content = '';
     },
     gotImage (imageFile) {
       let startTag = '', endTag = '', placeHolder = '';       
       this.showImageModal = false;
       console.log('how about image file?', imageFile);
       if (imageFile) {
         startTag = '<img src="' + api.state.publicUrl + imageFile + '" class="image" />';
         endTag = '';
         placeHolder = '';
         this.setSelectionRange(this.$refs.inputContent, startTag, endTag, placeHolder);
         this.renderContent();
       } else {
         console.log('did not catch resimage');
       }

     },
     renderContent() {
       const remark = new Remarkable();
       remark.set({
         html: true,
         breaks: true,
         linkify: true
       });

       const rptTitle = '# ' + this.title + ' # \n';
       return remark.render(rptTitle + this.content);
     },
     onClick(event) {
       let startTag = '', endTag = '', placeHolder = '';

       switch (event.currentTarget.id) {
         case 'title':
           startTag = '## ';
           endTag = ' ##';
           placeHolder = 'title';
           break;
         case 'bold':
           startTag = '**';
           endTag = '**';
           placeHolder = 'strong text';
           break;
         case 'italic':
           startTag = '*';
           endTag = '*';
           placeHolder = 'emphasized text';
           break;
         case 'insertLink':
           console.log('insert link');
           const dialogRef = this.dialog.open(DialogInsertLinkDialog, {

             disableClose: false
           });
           dialogRef.afterClosed().subscribe(result => {
             console.log(result);
             if (result !== 'Cancel') {
               startTag = '[';
               placeHolder = 'enter link description here';
               endTag = '](' + result + ')';
               this.setSelectionRange(this.$refs.inputContent, startTag, endTag, placeHolder);
               this.renderContent();
             }
           });
           break;
         case 'insertImage':
           console.log('insert image and set showImageModal');


           break;
         case 'insertTable':
           startTag = '\n';
           placeHolder = `| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |`;
           endTag = '\n';
           break;
         case 'numList':
           startTag = '1. ';
           placeHolder = 'list item';
           break;
         case 'bulList':
           startTag = '- ';
           placeHolder = 'list item';
           break;
         case 'horizontalline':
           startTag = '----------';
           placeHolder = ' ';
           break;
         default:
           console.log('%s :not implement yet', event.target.id);
       }
       this.setSelectionRange(this.$refs.inputContent, startTag, endTag, placeHolder);
       this.renderContent();

     },
     setSelectionRange(input, startTag, endTag, placeHolder) {
       //console.log('in selectionrange with start tag', startTag);
       let bDouble = arguments.length > 1, nSelStart = input.selectionStart, nSelEnd = input.selectionEnd, sOldText = input.value;
       // insert tag into original text
       input.value = sOldText.substring(0, nSelStart) + (bDouble ? startTag + sOldText.substring(nSelStart, nSelEnd) + placeHolder + endTag : startTag) + sOldText.substring(nSelEnd);
       // set selection range
       input.setSelectionRange(bDouble || nSelStart === nSelEnd ? nSelStart + startTag.length : nSelStart, (bDouble ? nSelEnd : nSelStart) + startTag.length + placeHolder.length);
       input.focus();
     },
   }
 }

</script>


<style scoped lang="scss">

 .title {
   font-size: 2em;
   width: 100%;
   border-radius: 6px;
   box-shadow: 2px 2px 8px rgba(0,0,0,.3);
   border: 0;
 }

 .content {
   width: 100%;
   border-radius: 6px;
   box-shadow: 2px 2px 8px rgba(0,0,0,.3);
   border: 0;
 }

 .icon {
   font-size: 20px;
   margin:10px;
 }

 .icon button {
   border: none;
 }

 textarea {
   resize: none;
   min-height: 200px;
 }

 .show {
   margin-top: 40px;
   box-shadow: 0 -1px 1px -1px black,
   0 1px 1px -1px black;
 }

img.image {
   max-width: 100% !important;
   border-radius: 5%;
 }
</style>
