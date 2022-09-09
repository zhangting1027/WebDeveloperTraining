<template>
  <div class="hello">
    <h1>{{ msg }}{{ value }}</h1>
    
    <table class="a-table" border="1" cellpadding="8">
      <thead class="a-head">
        <tr>
          <th class="thh" @click="sortById" :active="active">id</th>
          <th>value</th>
          <th @click="sortByTime" :active="active">data</th>
          <th>选择</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.value }}</td>
          <td>{{ item.data }}</td>
          <td>
            <input
              type="checkbox"
              name="type"
              :checked="checkout"
              @click="tchecked"
            />
          </td>
          <td>
            <button @click="del(item)">删除</button>
            <button @click="edit(item)">编辑</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    value: String,
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
