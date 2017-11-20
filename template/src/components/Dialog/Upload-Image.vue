<template>
  <!-- Modal -->
  <div id="myModal" ref="vueImageModal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{$t("insert_img")}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="inputImage" class="showImg">
            <img ref="image" alt="input image" class="image" :src="gotImage"/>
          </div>
          <div ref="dropzone" v-else class="inputArea">
            <input ref="input" name="" type="file" accept="image/*" style="display:none"/>
            {{$t("dragdrop")}}
          </div>
        </div>
        <div class="modal-footer">
          <button v-if="inputImage" type="button" class="btn btn-primary" @click="uploadImage" >{{$t("add_img")}}</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t("cancel")}}</button>
          <span><i class="fa fa-spinner fa-pulse " aria-hidden="true" v-if="loading"></i></span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
 import UploadService from '@/services/upload-service.js';
 import { mapActions } from 'vuex';
 
 export default {
   name: 'Upload-Image-Dialog',
   props: {
     closeAction: {
       type:Function
     }
   },
   i18n: {
     messages: {
       'en-US': {
         insert_img: 'Insert Image',
         dragdrop: 'Drag&drop or click to insert image',
         add_img: 'Add Image',
         cancel: 'Cancel'
       },
       'zh-TW': {
         insert_img: '加入影像',
         dragdrap: '拖曳或點擊來加入影像',
         add_img: '影像上載',
         cancel: '取消'
       }
     }
   },
   data () {
     return {
       inputImage: '',
       gotImage: '',
       resImage: '',
       loading: false
       }
   },
   mounted() {
     //console.log('in mounted');
     this.prepareModal();
   },
   methods: {
     ...mapActions(['imageFile']),
     prepareModal() {
       //console.log('in prepare Modal');
       const drop = this.$refs.dropzone;
       const input = this.$refs.input;

       input.addEventListener('change', (e) => {
         this.triggerCallback(e);
       });

       drop.addEventListener('dragover', (e) => {
         e.preventDefault();
         e.stopPropagation();
         drop.classList.add('dragover');
         return false;
       })

       drop.addEventListener('dragleave', (e) => {
         e.preventDefault();
         e.stopPropagation();
         drop.classList.remove('dragover');
         return false;
       })

       drop.addEventListener('drop', (e) => {
         e.preventDefault();
         e.stopPropagation();
         drop.classList.remove('dragover');
         this.triggerCallback(e);
       })

       drop.addEventListener('click', () => {
         input.value = null;
         input.click();
       })

     },
     triggerCallback(event) {
       let files;
       let reader = new FileReader();
       const self = this;

       if (event.dataTransfer) {              // from drag and drop
         files = event.dataTransfer.files;
       } else if (event.target) {            // from input file
         files = event.target.files;
       }

       reader.addEventListener('load', function (e) {
         self.inputImage = e.target.result;
         self.gotImage = e.target.result;

       })
       reader.readAsDataURL(files[0]);
     },
     async uploadImage() {
       this.loading = true;
       if (this.inputImage) {
         const res = await UploadService.uploadImage(this.inputImage)
         console.log(res);
         //this.resImage = res.data.file;
         this.loading = false;
         //this.imageFile(res.data.file);                     // send file to store
         this.$emit('resImage', res.data.file);
         $('#myModal').modal('hide');
         //this.closeAction();
       } else {
         console.log('can not find image');
       }
     }
   }
 }


</script>


<style scoped lang="scss">
 #myModal {
   .content {
     height: 350px;
   }
   .inputArea {
     display: block;
     height: 300px;
     border: 1px solid silver;
     background: #ccc;
     cursor: pointer;
     text-align: center;
     line-height: 300px;
   }

   .dragover {
     background: #555;
   }
   .showImg {
     height: 300px;
     position: relative;
   }

   .image {
     position: absolute;
     left: 0; right: 0;
     margin-left: auto; margin-right: auto;
     max-height: 300px; max-width: 450px;
     width: auto; height: auto;
   }

   .bottom {
     top: calc(100% - 50px);
   }

 }


</style>
