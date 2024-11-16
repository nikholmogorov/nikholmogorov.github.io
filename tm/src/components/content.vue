<script>
  export default{
      data(){
        return{
          task:'',
          listTask:[' say  hello', ' bye milk', ' take bag'],
          pick:'',
          theme: 'light', // значение этой переменной...1
        }
      },
      methods:{
        addTask(){
          this.listTask.push(' ' + this.task);
          this.task = '';
        },
        sortTask(){
          this.listTask.sort();
        },
        deleteTask(){
          delete this.listTask[this.pick];
        },
        changeTheme(){
          alert('В разработке!');
        if (document.documentElement.hasAttribute('theme')) { // не работает
            this.document.documentElement.removeAttribute('theme'); // не работает
        } else {
            this.document.documentElement.setAttribute('theme', 'dark'); // не работает
        }        
          // alert('this is ' + this.theme + ' theme');
          // this.theme = this.theme === 'light' ? 'dark' : 'light'; // 2...крутится этим, ...2

          // if (this.theme === 'light') {
          //  alert('theme changed to light');
          // } else {
          //  alert('theme changed to dark');
          // }
        },
      }
  }
</script>
<template>
    <div class="content">
        <div class="container">
            <p>Add Task:</p>
            <input type="text" placeholder="write your task here" class="i-t" v-model="task"> <input type="button" value="Add" class="i-t-2" @click="addTask()">
            <p>Task List:</p>
            <ul>
                <li v-for="(i, index) in listTask"><input type="radio" name="task" id="" :value="index" v-model="pick">{{ i }}</li>
            </ul>
            <div class="two_buttons">
              <input type="button" class="bottom_button" value="Sort" @click="sortTask()">
              <input type="button" class="bottom_button" value="Delete" @click="deleteTask()">
              <input type="button" class="bottom_buttonCT" value="Change Theme" @click="changeTheme()">
            </div>
        </div>
    </div>
</template>
<style scoped>

:root {
    --background-color: #fff;
    --element-color: #000;
    --element-color-transparent: #00000080;
}

:root[theme='dark'] {
    --background-color: #000;
    --element-color: #fff;
    --element-color-transparent: #ffffff80;
}

body {
    background-color: var(--background-color);
    color: var(--element-color);
}

/* ::placeholder {
    color: var(--element-color-tranparent);
} */

.container{
  width: 80%;
  background-color: #fff;
  padding: 20px;
  margin: 20px auto 20px auto;
  border: solid 1px;
}
.container p{
  font-size: 25px;
}
.i-t{
  width: 70%;
  height: 40px;
  border: solid 1px;
  margin: 10px auto 10px auto;
  font-size: 25px;
}
.i-t-2{
  width: 25%;
  height: 42px;
  border: solid 1px;
  margin: 10px auto 10px auto;
  background-color: #fff;
  color: #000;
  font-size: 25px;
  text-transform: uppercase;
}
li{
  margin: 10px auto 10px auto;
  font-size: 20px;
}
input[type="radio"] {
  accent-color: #000;
  width: 15px;
  height: 15px;
}
.two_buttons{
  display: flex;
  justify-content: center;
  margin: 0px 0px 0px 0px;
}
.bottom_button{
  width: 25%;
  height: 40px;
  border: solid 1px;
  margin: 10px 10px 10px 10px;
  background-color: #fff;
  color: #000;
  font-size: 25px;
  text-transform: uppercase;
}
.bottom_button:active{
  border: solid 1px;
  border-color: #000;
  background-color: #000;
  color: #fff;
}
.i-t-2:active{
  border: solid 1px;
  border-color: #000;
  background-color: #000;
  color: #fff;
}
.bottom_buttonCT{
  width: 45%;
  height: 40px;
  border: solid 1px;
  margin: 10px 10px 10px 10px;
  background-color: #fff;
  color: #000;
  font-size: 25px;
  text-transform: uppercase;
}
.bottom_buttonCT:active{
  border: solid 1px;
  border-color: #000;
  background-color: #000;
  color: #fff;
}
 /* container.light {   3...но темы не переключаются 
  background-color: white;
  color: black;
}
container.dark {
  background-color: black;
  color: white;
} */
</style>