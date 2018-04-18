<template lang="html">
  <div class="md-wrapper">
  <div class="md-editor" :style="{height:height+'px',zIndex:zIndex, margin: '20px auto'}">
    <textarea id="md-text"></textarea>
  </div>
  <el-button type="primary" @click="submit" class="submit-btn">提交</el-button>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
export default {
  name: 'md-editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请在这里输入您的反馈建议'
    },
    toolbar: {
      type: Array
    },
    height: {
      type: Number,
      default: 200
    },
    zIndex: {
      type: Number,
      default: 100
    },
    spellChecker: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(newVal) {
      this.mde.value(newVal);
    }
  },
  mounted() {
    this.mde = new SimpleMDE({
      element: document.getElementById('md-text'),
      toolbar: this.toolbar,
      autofocus: this.autofocus,
      initialValue: this.value,
      spellChecker: this.spellChecker,
      placeholder: this.placeholder,
      status: this.status
    });
    this.mde.codemirror.on('change', () => {
      this.$emit('input', this.mde.value());
    });
    // if (this.value) {
    //   this.mde.value(this.value);
    // }
  },
  methods: {
    submit() {
      this.$emit('submit', this.mde.value());
    }
  },
  destoryed() {
    this.mde = null;
  }
}
</script>

<style lang="scss">
.md-wrapper {
    .CodeMirror {
        /*height: 150px;*/
        min-height: 150px;
        height: 150px;
    }
    .CodeMirror-scroll {
        min-height: 150px;
        height: 150px;
    }
    .el-button {
        margin-top: 20px;
    }
}
</style>
