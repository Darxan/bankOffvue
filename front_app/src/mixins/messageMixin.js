export default {
  methods: {
    showMessage(text = "Success", type = "success") {
      return this.$message({
        message: text,
        type: type,
        center: true
    });
    }
  }
}