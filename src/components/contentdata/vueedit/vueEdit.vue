<template>
  <section>
    <quill-editor v-model="contents"
              ref="myQuillEditor"
              :options="editorOption">
    </quill-editor>
    <Upload :action="action" style='display: none'
            :headers='headers'
            :on-success="uploadSuccess">
      <Button type="ghost" icon="ios-cloud-upload-outline" id="imgInput">上传图片</Button>
    </Upload>
  </section>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor'
    import * as Quill from 'quill'
  export default {
    name: 'vueEdit',
    data() {
      return {
        contents: '',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction
              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'align': [] }],
              ['link', 'image', 'video'],
              ['clean']        
            ],
            imageResize: {
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
            }
          },
          placeholder: '请输入...'
        },
        headers: {   //图片上传头部参数
            "x-qingful-appid": '526594162805',
            "x-qingful-appkey": '12166320-d969-11e7-954f-03e048d62ffc',
            "x-qingful-dev": 'true',
            'token': localStorage.getItem('token')
        },
        imgHost: 'http://img1.qingful.com/',
        action: 'https://baas.qingful.com/2.0/class/home/image/upload',
        addRange: null,
        imgUpload: '',
      }
    },
    mounted() {
        // 为图片ICON绑定事件  getModule 为编辑器的内部属性
        this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    },
    computed: {
      editor() {
          return this.$refs.myQuillEditor.quill
      },
      
    },
    watch: {
      'contents': function(n, o) {
        this.$emit('getContent',n)
      },
      'content': function(n, o) {
        this.contents = n
      }
    },
    methods: {
      onEditorChange({ quill, html, text }) {
        this.contents = html
      },
      saveImg: function(params) {
        let url = params.name;
        this.$axios.saveImg({
            data: params,
            method:  'post'
        }).then(res => {
            this.$Message.success('保存成功')
        })
        if (url != null && url.length > 0) {  // 将文件上传后的URL地址插入到编辑器文本中
          this.addRange = this.$refs.myQuillEditor.quill.getSelection()
          url =  this.imgHost + url
          this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', url, Quill.sources.USER)   // 调用编辑器的 insertEmbed 方法，插入URL
        } else {
          this.$Message.error('图片插入失败！！！！')
        }
      },
      uploadSuccess: function(res, file) {
        const data = {
            name: res.data
        }
        this.saveImg(data)
      },
      imgHandler(state) {
        this.addRange = this.$refs.myQuillEditor.quill.getSelection()
        if (state) {
          let fileInput = document.getElementById('imgInput')
          fileInput.click() // 加一个触发事件
        }
      },
    },
    components: {
        quillEditor
    },
    props: ['content'],

  }
</script>


<style scoped>
    .ql-editor {
        min-height: 500px;
    }

    .quill-code {
        border: none;
        height: auto;
    }
</style>