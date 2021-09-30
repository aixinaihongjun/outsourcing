<template>
  <footer class="main-footer alternate5">
    <div class="auto-container">
      <!--Widgets Section-->
      <div class="widgets-section wow fadeInUp">
        <div class="row">
          <div class="big-column col-xl-4 col-lg-3 col-md-12">
            <div class="footer-column about-widget">
              <div class="logo"><a href="#"><img src="../assets/images/logo.svg" alt=""></a></div>
              <p class="phone-num"><span>全国免费咨询热线</span><a href="thebeehost@support.com">400-0357-020</a></p>
              <p class="address"><a href="mailto:support@superio.com" class="email">shanwei@yeah.net</a></p>
            </div>
          </div>

          <div class="big-column col-xl-8 col-lg-9 col-md-12">
            <div class="row">
              <div class="footer-column col-lg-3 col-md-6 col-sm-12">
                <div class="footer-widget links-widget">
                  <h4 class="widget-title">雇主</h4>
                  <div class="widget-content">
                    <ul class="list">
                      <li><a href="#">Browse Jobs</a></li>
                      <li><a href="#">Browse Categories</a></li>
                      <li><a href="#">Candidate Dashboard</a></li>
                      <li><a href="#">Job Alerts</a></li>
                      <li><a href="#">My Bookmarks</a></li>
                    </ul>
                  </div>
                </div>
              </div>


              <div class="footer-column col-lg-3 col-md-6 col-sm-12">
                <div class="footer-widget links-widget">
                  <h4 class="widget-title">开发者</h4>
                  <div class="widget-content">
                    <ul class="list">
                      <li><a href="#">Browse Candidates</a></li>
                      <li><a href="#">Employer Dashboard</a></li>
                      <li><a href="#">Add Job</a></li>
                      <li><a href="#">Job Packages</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="footer-column col-lg-3 col-md-6 col-sm-12">
                <div class="footer-widget links-widget">
                  <h4 class="widget-title">关于我们</h4>
                  <div class="widget-content">
                    <ul class="list">
                      <li><a href="#">Job Page</a></li>
                      <li><a href="#">Job Page Alternative</a></li>
                      <li><a href="#">Resume Page</a></li>
                      <li><a href="#">Blog</a></li>
                      <li><a href="#">Contact</a></li>
                    </ul>
                  </div>
                </div>
              </div>


              <div class="footer-column col-lg-3 col-md-6 col-sm-12">
                <div class="footer-widget links-widget">
                  <h4 class="widget-title">帮助</h4>
                  <div class="widget-content">
                    <ul class="list">
                      <li><a href="#">Site Map</a></li>
                      <li><a href="#">Terms of Use</a></li>
                      <li><a href="#">Privacy Center</a></li>
                      <li><a href="#">Security Center</a></li>
                      <li><a href="#">Accessibility Center</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!--Bottom-->
    <div class="footer-bottom">
      <div class="auto-container">
        <div class="outer-box">
          <div class="copyright-text">© 2021 <a href="#">青盟科技</a>. All Right Reserved.</div>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll To Top -->
    <div class="scroll-to-top scroll-to-target" data-target="html"><span class="fa fa-angle-up"></span></div>
  </footer>
</template>

<script>
export default {
  name: "MainFooter"
}
</script>

<style lang="scss" scoped>
/***

==================================================================
Main Footer
==================================================================

***/

.main-footer {
  position: relative;
  background-color: #ffffff;
}

.main-footer.alternate {
  background: #F5F7FC;
}

.main-footer.alternate5 {
  border-top: 1px solid #ECEDF2;
}

/*=== Widgets Section ===*/

.main-footer .widgets-section {
  position: relative;
  padding-top: 100px;
  padding-bottom: 50px;
}

.main-footer .footer-column {
  position: relative;
  margin-bottom: 50px;
}

.main-footer .footer-widget {
  position: relative;
}

.main-footer .widget-title {
  position: relative;
  font-size: 18px;
  font-weight: 500;
  color: #2F2D51;
  line-height: 1.4em;
  margin-bottom: 30px;
}

.main-footer .logo {
  position: relative;
  margin-bottom: 25px;
}

.main-footer .logo img {
  display: block;
}

.main-footer .phone-num {
  position: relative;
  font-size: 18px;
  line-height: 28px;
  color: #202124;
  font-weight: 500;
  margin-bottom: 15px;
}

.main-footer .phone-num span {
  position: relative;
  display: block;
}

.main-footer .phone-num a {
  color: #1967D2;
}

.main-footer .address {
  font-size: 14px;
  line-height: 30px;
  color: #696969;
  font-weight: 400;
}

.main-footer .address a {
  color: #696969;
}

/*=== Cities Widget ===*/

.main-footer .links-widget {
  position: relative;
  padding-left: 20px;
}

.main-footer .list {
  position: relative;
}

.main-footer .list li {
  position: relative;
  display: block;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #696969;
  margin-bottom: 15px;
}

.main-footer .list li a {
  display: inline-block;
  color: #696969;
  -webkit-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition: all 200ms ease;
}

.main-footer .list li:before {
  position: absolute;
  left: 0;
  top: 10px;
  height: 2px;
  width: 0px;
  content: "";
  border-bottom: 2px solid #1967D2;
  -webkit-transition: all 300ms ease;
  -o-transition: all 300ms ease;
  transition: all 300ms ease;
}

.main-footer .list li:hover:before {
  width: 15px;
}

.main-footer .list li:hover a {
  -webkit-transform: translateX(25px);
  -ms-transform: translateX(25px);
  transform: translateX(25px);
  color: #1967D2;
}

/*=== Social Widget ===*/

.main-footer .footer-bottom {
  position: relative;
  width: 100%;
  padding: 36px 0;
  text-align: center;
  border-top: 1px solid #ECEDF2;
  min-height: 100px;
}

.main-footer .footer-bottom .bottom-left {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.main-footer .footer-bottom .logo {
  margin-bottom: 0;
  margin-right: 28px;
}

.main-footer .copyright-text {
  position: relative;
  display: block;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  color: #696969;
  padding: 0;
}

.main-footer .copyright-text a {
  display: inline-block;
  color: #696969;
  line-height: 30px;
  -webkit-transition: all 300ms ease;
  -o-transition: all 300ms ease;
  transition: all 300ms ease;
}

.main-footer .copyright-text a:hover {
  text-decoration: underline;
  color: #9DB1BC;
}

.main-footer .footer-bottom .outer-box {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.main-footer .social-links {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.main-footer .social-links a {
  position: relative;
  margin-left: 35px;
  font-size: 14px;
  line-height: 24px;
  color: #696969;
  -webkit-transition: all 300ms ease;
  -o-transition: all 300ms ease;
  transition: all 300ms ease;
}

.main-footer .social-links a:hover {
  color: #BC91E8;
}
</style>