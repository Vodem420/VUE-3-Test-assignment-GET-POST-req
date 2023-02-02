<script setup>
import ButtonComp from "@/components/button-comp.vue";
import CardComp from "../components/Card-comp.vue";
import usersApi from "../services/usersApi";
import InputComp from "../components/Input-comp.vue";
import RadioButtonGroupComp from "../components/RadioButtonGroup-comp.vue";
import { vMaska } from "maska";
import { ref, reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

const items = ref([]);
const selectedFile = ref(null);
const selectedField = ref(null);
const formData = reactive({
  name: "",
  email: "",
  phone: "",
  radio: null,
  file: null,
});
const radioOptions = ref({
  profession_options: [
    {
      value: "Frontend developer",
      text: "Frontend developer",
    },
    {
      value: "Backend developer",
      text: "Backend developer",
    },
    {
      value: "Designer",
      text: "Designer",
    },
    {
      value: "QA",
      text: "QA",
    },
  ],
});

const rules = computed(() => {
  return {
    name: {
      required,
      minLength: minLength(2),
    },
    email: { required, minLength: minLength(5) },
    phone: { required, minLength: minLength(19), maxLength: maxLength(19) },
    radio: { required },
    file: { required },
  };
});

const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    return;
  } else {
    return false;
  }
};

const fetchUsers = async function (params) {
  try {
    items.value = await usersApi.getUsers(params);
  } catch (e) {
    alert("error");
  }
};
const getMoreUsers = async function () {
  fetchUsers({ page: 2 });
};
fetchUsers();

const onFileSelected = function (e) {
  formData.file = e.target.files[0];
  console.log(formData.file, "selectedFile");
};
</script>

<template>
  <div class="formPage">
    <div class="S1__wrapper">
      <div class="S1">
        <div class="S1__content">
          <h1>Test assignment for front-end developer</h1>
          <p>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <button-comp class="btn__primary">Sign up</button-comp>
        </div>
      </div>
    </div>
    <div class="S2">
      <h1>Working with GET request</h1>
      <div class="S2__list">
        <CardComp v-for="item in items" :key="item.id" :item="item" />
      </div>
      <button-comp class="btn__primary" @click="items += 6"
        >Show more</button-comp
      >
    </div>
    <div class="S3">
      <h1>Working with POST request</h1>
      <form @submit.prevent="submitForm">
        <div class="S3__inputWrapper">
          <input-comp
            v-model="formData.name"
            label="Your name"
            :class="{
              error: v$.name.$errors.length,
              '': !v$.name.$errors.length,
            }"
            class="mb-2"
          />
          <span v-for="error in v$.name.$errors" :key="error.$uid" class="error"
            >Invalid name</span
          >
        </div>
        <div class="S3__inputWrapper">
          <input-comp
            v-model="formData.email"
            :class="{
              error: v$.email.$errors.length,
              '': v$.email.$errors.length,
            }"
            label="Email"
            class="mb-2"
          />
          <span
            v-for="error in v$.email.$errors"
            :key="error.$uid"
            class="error"
            >Invalid email</span
          >
        </div>
        <div class="S3__inputWrapper">
          <input-comp
            v-model="formData.phone"
            v-maska
            :class="{
              error: v$.phone.$errors.length,
              '': v$.phone.$errors.length,
            }"
            label="Phone"
            class="mb-2"
            inputmode="numeric"
            data-maska="+38 (###) ### ## ##"
          />
          <span
            v-for="error in v$.phone.$errors"
            :key="error.$uid"
            class="error"
            >Invalid phone number</span
          >
        </div>
        <div class="S3__inputWrapper">
          <RadioButtonGroupComp
            id="profession"
            v-model="selectedField"
            :class="{
              error: v$.radio.$errors.length,
              '': v$.radio.$errors.length,
            }"
            :options="radioOptions.profession_options"
            label="Select your position"
          />
          {{ selectedField }} - selected
          <span
            v-for="error in v$.radio.$errors"
            :key="error.$uid"
            class="error"
            >Field is required</span
          >
        </div>
        <div class="S3__inputWrapper">
          <input
            id="file"
            :class="{
              error: v$.file.$errors.length,
              '': v$.file.$errors.length,
            }"
            type="file"
            name="myfiles[]"
            multiple
            @change="onFileSelected"
          />
          <span v-for="error in v$.file.$errors" :key="error.$uid" class="error"
            >Field is required</span
          >
        </div>
        <button-comp
          :class="{ btn__primary: !v$.$invalid, btn__disabled: v$.$invalid }"
          type="submit"
          >Sign up</button-comp
        >
      </form>
    </div>
  </div>
</template>
