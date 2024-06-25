<template>
    <div class="d-flex flex-column gap-2">
        <div>{{ $store.state.user.email }}</div>
        <div>
            <h2>General</h2>
            <div class="form-floating mb-3">
                <input class="form-control" id="inputLOCATION" type="email" placeholder="" />
                <label for="inputLOCATION" style="background: transparent;">Email address</label>
            </div>
        </div>
        <div>
            <h2>Third Party</h2>
        </div>
    </div>
</template>