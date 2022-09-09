<template>
  <div>
    <div class="box">
      <input type="text" v-model="value" />
      <button @click="add">添加</button>
    </div>
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
              :data-id="item.id"
              type="checkbox"
              name="type"
              :checked="item.checkout"
              @click="tchecked"
            />
          </td>
          <td>
            <button @click="del(item)">删除</button>
            <!-- <button @click="edit(item)">编辑</button> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getCurrentDate } from "./utils/data.js";
export default {
  name: "App",
  data() {
    return {
      list: [
        {
          id: 0,
          value: 1,
          data: "2022-09-07 14:31:10",
          checkout: false,
          times: "",
        },
      ],
      value: "",
      id: 1,
      times: "",
      active: false,
      checkout: false,
    };
  },
  methods: {
    add() {
      let time = new Date().getTime();
      if (this.value != "") {
        let obj = {
          id: this.id,
          value: this.value,
          data: getCurrentDate(),
          times: time,
          checkout: false,
        };
        this.list.unshift(obj);
        this.value = "";
        this.id =
          this.list.length > 0
            ? Math.max(...this.list.map((v) => v.id)) + 1
            : 1;
      }
    },
    del(v) {
      // this.list.splice(idx, 1);
      if (v.checkout === true) {
        this.list = this.list.filter((item) => item.id != v.id);
      }
    },
    // edit(v) {
    //   console.log(v);
    // },
    sortById() {
      if (this.active === false) {
        this.list.sort((a, b) => {
          return a.id - b.id;
        });
        this.active = true;
      } else {
        this.list.reverse();
        this.active = false;
      }
    },
    sortByTime() {
      if (this.active === false) {
        this.list.sort((a, b) => {
          return a.times - b.times;
        });
        this.active = true;
      } else {
        this.list.reverse();
        this.active = false;
      }
    },
    tchecked(event) {
      const active = event.target.dataset.id;
      this.list.map((item) => {
        active == item.id ? (item.checkout = true) : false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  margin: auto;
  width: 300px;
  margin-bottom: 20px;
}
.a-table {
  margin: auto;
  text-align: center;
}
</style>
