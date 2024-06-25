<template>
  <div class="modal fade" id="sendEmailModal" tabindex="-1" aria-labelledby="sendEmailModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="sendEmailModalLabel">Send Email</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex flex-column gap-2">
          <div class="d-flex gap-2 align-items-center">
            <label>To:</label>
            <input type="email" class="form-control" :value="$store.state.modals.sendEmail.to" @input="ev => $store.state.modals.sendEmail.to = ev.target.value">
          </div>
          <div class="d-flex gap-2 align-items-center">
            <!-- <label>Subject:</label> -->
            <input type="text" class="form-control" :value="$store.state.modals.sendEmail.subject" placeholder="subject" @input="ev => $store.state.modals.sendEmail.subject = ev.target.value">
          </div>
          <div class="d-flex gap-2 align-items-center">
            <!-- <label>Message:</label> -->
            <!-- <textarea class="form-control">
              {{ $store.state.modals.sendEmail.message }}
            </textarea> -->
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="sendEmail()">Send Email</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    methods: {
      async sendEmail() {
        console.log(this.$store.state.modals.sendEmail);
        const emailing = await this.$store.state.api.post('/google/gmail/send', {
          to: this.$store.state.modals.sendEmail.to,
          subject: this.$store.state.modals.sendEmail.subject,
          html: this.$store.state.modals.sendEmail.html,
          attachments: this.$store.state.modals.sendEmail.attachments
        })
        console.log(emailing);
        this.$store.dispatch('notify', emailing)
      }
    }
  }
  </script>
  