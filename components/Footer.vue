<template>
  <footer class="footer">
    <div class="footer__content content">
      <p>&copy; {{ currYear }} 7Revolutions</p>
      <div class="social-links">
        <a href="https://google.com" target="_blank" class="social-links__link facebook">
          <facebook />
        </a>
        <a href="https://google.com" target="_blank" class="social-links__link twitter">
          <twitter />
        </a>
        <a href="https://google.com" target="_blank" class="social-links__link linkedin">
          <linkedin />
        </a>
        <a href="https://google.com" target="_blank" class="social-links__link email">
          <email />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import facebook from '@/assets/svg/facebook.svg?inline'
import twitter from '@/assets/svg/twitter.svg?inline'
import linkedin from '@/assets/svg/linkedin.svg?inline'
import email from '@/assets/svg/email.svg?inline'

export default {
  name: 'Footer',
  components: {
    facebook,
    twitter,
    linkedin,
    email
  },
  computed: {
    currYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
.footer {
  padding: 50px 0;
  background: #303030;
  &__content {
    display: flex;
    justify-content: space-between;
  }
  p {
    color: $offWhite;
  }
  .social-links {
    display: flex;
    align-items: center;
    &__link {
      display: block;
      width: 25px;
      height: 25px;
      margin: 0 8px;
      &:after {
        display: none;
      }
      &.email {
        width: 40px;
        height: 30px;
        margin-top: -7px;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: $offWhite;
        transition: fill 250ms $easeOutMaterial;
      }
      &:hover {
        &.facebook { svg { fill: #4267B2; }}
        &.twitter { svg { fill: #1DA1F2; }}
        &.linkedin { svg { fill: #2867B2; }}
        &.email { svg { fill: #D44638; }}
      }
    }
  }
}
</style>
