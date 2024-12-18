<template>
    <div class="space-y-4">
      <div v-for="(item, index) in items" :key="item.id" class="bg-white shadow rounded-lg overflow-hidden">
        <button @click="toggle(index)" class="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none">
          <span>{{ item.name }}</span>
          <div class="flex space-x-2 items-center">
            <svg :class="[activeIndex === index ? 'rotate-180' : '', 'transform transition-transform duration-300 w-4 h-4']" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            <button @click.stop="remove(item.id)" class="text-red-500 focus:outline-none">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </button>
        <transition name="accordion" @enter="enter" @leave="leave">
          <div v-if="activeIndex === index" class="p-4">
            <p class="text-gray-700">{{ item.email }}</p>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, type PropType } from 'vue';
  
  interface Item {
    id:number,
    name:string,
    email:string
  }

  defineProps({
    items: {
      type: Array as PropType<Item[]>,
      required: true
    }
  });
  
  const emit = defineEmits(['remove']);
  
  const activeIndex = ref(null);
  
  const toggle = (index:any) => {
    activeIndex.value = activeIndex.value === index ? null : index;
  };
  
  const remove = (id:number) => {
    emit('remove', id);
  };
  
  const enter = (element:any) => {
    element.style.height = `${element.scrollHeight}px`;
  };
  
  const leave = (element:any) => {
    element.style.height = `${element.scrollHeight}px`;
    requestAnimationFrame(() => {
      element.style.height = '0px';
    });
  };
  </script>
  
  <style scoped>
  .accordion-enter-active,
  .accordion-leave-active {
    transition: height 0.3s ease-out;
    overflow: hidden;
  }
  .accordion-enter,
  .accordion-leave-to {
    height: 0;
  }
  </style>