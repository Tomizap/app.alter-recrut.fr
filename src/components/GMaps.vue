<template>
    <div :id="id"></div>
</template>

<script>
export default {
    props: ['lat', "lng", "zoom"],
    data() {
        return {
            id: '',
            mapOptions = {
                center: { lat: this.lat || -33.860664, lng: this.lng || 151.208138 },
                zoom: this.zoom || 14
            }
        }
    },
    methods: {
        load() {
            const mapDiv = document.getElementById(this.id);
            const map = new google.maps.Map(mapDiv, this.mapOptions);
            return map;
        }
    },
    mounted() {
        this.load()
    }
};
</script>