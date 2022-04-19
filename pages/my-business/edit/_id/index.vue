<script>
export default {
  middleware({redirect, route}){
    return redirect(`/my-business/edit/${route.params.id}/subcategory`)
  }
}
</script>
