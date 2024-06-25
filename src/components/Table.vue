

<template>
    <table>
        <thead>
            <tr>
                <th v-for="(value, key) in Object.keys(data[0] || {})" :key="key">
                    {{ value }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in data.slice(0, 20)" :key="index">
                <td v-for="(value, key) in Object.entries(item)" :key="key">
                    {{ value[1] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
  
  <script>
  export default {
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  