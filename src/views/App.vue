<template>
  <v-window v-model="step">
    <v-window-item :value="1">
      <v-app class="hidden-lg-and-up">
        <v-main class="hidden-lg-and-up" style="background:#f66c1f">
          <v-img
            src="https://res.cloudinary.com/tell/image/upload/v1604278196/tellbooks_mluam5.png"
          >
            <h1
              style="padding-top:470px;font-size:29px;line-height:normal;margin:15px"
              class="fade-in font-weight-black white--text"
            >
              Welcome to tellbooks
            </h1>
            <p
              style="font-size:15px;line-height:normal;margin:20px;margin-top:-10px"
              class="fade-in white--text font-weight-semibold"
            >
              Earn 85%-90% royalty when you publish on tellbooks. Withdraw at
              anytime.
            </p>
            <v-btn
              @click="step++"
              color="white"
              class="fade-in"
              style="color:#f66c1f;margin:20px;width:285px;margin-right:20px;margin-top:-10px;margin-bottom:s"
            >
              Next <v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </v-img>
        </v-main>
        <v-main class="hidden-md-and-down" style="background:#f66c1f">
          <v-img
            src="https://res.cloudinary.com/tell/image/upload/v1604278196/tellbooks_mluam5.png"
            aspect-ratio="2.05"
          >
            <h1
              style="padding-top:470px;font-size:50px;line-height:normal;margin:15px"
              class="fade-in font-weight-black white--text"
            >
              Welcome to tellbooks
            </h1>
            <p
              style="font-size:20px;line-height:normal;margin:20px;margin-top:-10px"
              class="fade-in white--text font-weight-semibold"
            >
              Earn 85%-90% royalty when you publish on tellbooks. Withdraw at
              anytime.
            </p>
            <v-btn
              @click="step++"
              color="white"
              class="fade-in"
              style="color:#f66c1f;margin:20px;width:285px;margin-right:20px;margin-top:-10px;margin-bottom:s"
            >
              Next <v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </v-img>
        </v-main>
      </v-app>
    </v-window-item>
    <v-window-item :value="2">
      <v-app class="hidden-lg-and-up">
        <v-main class="hidden-lg-and-up" style="background:#f66c1f">
          <v-img
            src="https://res.cloudinary.com/tell/image/upload/v1604278192/tellbooks6_w9tg1e.png"
          >
            <h1
              style="padding-top:430px;font-size:29px;line-height:normal;margin:15px"
              class="font-weight-black white--text"
            >
              Read on the Go!
            </h1>
            <p
              style="font-size:15px;line-height:normal;margin:15px;margin-top:-10px"
              class="white--text font-weight-semibold"
            >
              Enjoy amazing reading experience on both <br />
              Web & Mobile App.
            </p>
            <v-btn
              @click="step--"
              color="white"
              outlined
              style="color:#f66c1f;margin:15px;width:285px;margin-right:20px;margin-top:-10px;"
              ><v-icon>mdi-chevron-left</v-icon> Previous</v-btn
            >
            <v-btn
              @click="step++"
              color="white"
              style="color:#f66c1f;margin:15px;width:285px;margin-right:20px;margin-top:-5px;margin-bottom:10px"
            >
              Next <v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </v-img>
        </v-main>
        <v-main class="hidden-md-and-down" style="background:#f66c1f">
          <v-img
            src="https://res.cloudinary.com/tell/image/upload/v1604278192/tellbooks6_w9tg1e.png"
            aspect-ratio="2.05"
          >
            <h1
              style="padding-top:430px;font-size:55px;line-height:normal;margin:20px"
              class="font-weight-black white--text"
            >
              Read on the Go!
            </h1>
            <p
              style="font-size:20px;line-height:normal;margin:20px;margin-top:-20px"
              class="white--text font-weight-semibold"
            >
              Enjoy amazing reading experience on both Web & Mobile App.
            </p>
            <v-btn
              @click="step--"
              color="white"
              outlined
              style="color:#f66c1f;margin:15px;width:285px;margin-right:20px;margin-top:-5px;margin-bottom:10px"
              ><v-icon>mdi-chevron-left</v-icon> Previous</v-btn
            >
            <v-btn
              @click="step++"
              color="white"
              style="color:#f66c1f;margin:15px;width:285px;margin-right:20px;margin-top:-5px;margin-bottom:10px"
            >
              Next <v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </v-img>
        </v-main>
      </v-app>
    </v-window-item>
    <v-window-item :value="3">
      <v-app>
        <v-main class="hidden-lg-and-up" style="background:#f66c1f">
          <v-img
            src="https://res.cloudinary.com/tell/image/upload/v1604278365/tellbooks2_x1toon.png"
          >
            <h1
              style="padding-top:430px;font-size:29px;line-height:normal;margin:15px"
              class="font-weight-black white--text"
            >
              Any File. Your Choice
            </h1>
            <p
              style="font-size:15px;line-height:normal;margin:15px;margin-top:-10px"
              class="white--text font-weight-semibold"
            >
              Upload any document filetype of your choice <br />Pdf & Epub
              supported.
            </p>
            <v-btn
              @click="step--"
              color="white"
              outlined
              style="color:#f66c1f;margin:15px;width:285px;margin-right:20px;margin-top:-10px;"
              ><v-icon>mdi-chevron-left</v-icon> Previous</v-btn
            >
            <v-btn
              @click="step++"
              color="white"
              style="color:#f66c1f;margin:15px;width:285px;margin-right:20px;margin-top:-5px;margin-bottom:4px"
            >
              Next <v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </v-img>
        </v-main>

        <v-main class="hidden-md-and-down" style="background:#f66c1f">
          <v-img
            src="https://res.cloudinary.com/tell/image/upload/v1604278365/tellbooks2_x1toon.png"
            aspect-ratio="2.05"
          >
            <h1
              style="padding-top:430px;font-size:55px;line-height:normal;margin:15px"
              class="font-weight-black white--text"
            >
              Any File. Your Choice
            </h1>
            <p
              style="font-size:20px;line-height:normal;margin:15px;margin-top:-20px"
              class="white--text font-weight-semibold"
            >
              Upload any document filetype of your choice Pdf & Epub supported.
            </p>
            <v-btn
              @click="step--"
              color="white"
              outlined
              style="color:#f66c1f;margin:15px;width:285px;margin-right:20px;margin-top:-5px;margin-bottom:10px"
              ><v-icon>mdi-chevron-left</v-icon> Previous</v-btn
            >
            <v-btn
              @click="step++"
              color="white"
              style="color:#f66c1f;margin:15px;width:285px;margin-right:20px;margin-top:-5px;margin-bottom:10px"
            >
              Next <v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </v-img>
        </v-main>
      </v-app>
    </v-window-item>
    <v-window-item :value="4">
      <v-app>
        <v-main class="hidden-lg-and-up" style="background:#f66c1f">
          <v-img
            src="https://res.cloudinary.com/tell/image/upload/v1604278195/tellbooks3_pjmsx8.png"
          >
            <h1
              style="padding-top:430px;font-size:32px;line-height:normal;margin:20px"
              class="font-weight-black white--text"
            >
              Show Love, with Gifts
            </h1>
            <p
              style="font-size:15px;line-height:normal;margin:20px;margin-top:-10px"
              class="white--text font-weight-semibold"
            >
              Gift your friends books, comics and<br />other literary items.
            </p>
            <v-btn
              @click="step--"
              color="white"
              outlined
              style="color:#f66c1f;margin:20px;width:285px;margin-right:20px;margin-top:-10px;"
              ><v-icon>mdi-chevron-left</v-icon> Previous</v-btn
            >
            <v-btn
              @click="step++"
              color="white"
              style="color:#f66c1f;margin:20px;width:285px;margin-right:20px;margin-top:-10px;margin-bottom:4px"
            >
              Next <v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </v-img>
        </v-main>

        <v-main class="hidden-md-and-down" style="background:#f66c1f">
          <v-img
            src="https://res.cloudinary.com/tell/image/upload/v1604278195/tellbooks3_pjmsx8.png"
            aspect-ratio="2.05"
          >
            <h1
              style="padding-top:430px;font-size:55px;line-height:normal;margin:20px"
              class="font-weight-black white--text"
            >
              Show Love, with Gifts
            </h1>
            <p
              style="font-size:20px;line-height:normal;margin:20px;margin-top:-10px"
              class="white--text font-weight-semibold"
            >
              Gift your friends books, comics and other literary items.
            </p>
            <v-btn
              @click="step--"
              color="white"
              outlined
              style="color:#f66c1f;margin:20px;width:285px;margin-right:20px;margin-top:-10px;margin-bottom:4px"
              ><v-icon>mdi-chevron-left</v-icon> Previous</v-btn
            >
            <v-btn
              @click="step++"
              color="white"
              style="color:#f66c1f;margin:20px;width:285px;margin-right:20px;margin-top:-10px;margin-bottom:4px"
            >
              Next <v-icon>mdi-chevron-right</v-icon></v-btn
            >
          </v-img>
        </v-main>
      </v-app>
    </v-window-item>
    <v-window-item :value="5">
      <v-app>
        <v-main class="hidden-lg-and-up" style="background:#f66c1f">
          <v-img
            src="https://res.cloudinary.com/tell/image/upload/v1604278195/tellbooks5_offvdu.png"
          >
            <h1
              style="padding-top:430px;font-size:32px;line-height:normal;margin:20px"
              class="font-weight-black white--text"
            >
              Get Started Today!
            </h1>
            <p
              style="font-size:15px;line-height:normal;margin:20px;margin-top:-10px"
              class="white--text font-weight-semibold"
            >
              Create a free tellbooks account in<br />
              less than a minute.
            </p>
            <v-btn
              to="/signup"
              color="white"
              class="fadein-down"
              outlined
              style="color:#f66c1f;margin:20px;width:285px;margin-right:20px;margin-top:-10px;"
              >Sign Up</v-btn
            >
            <v-btn
              to="/login"
              color="white"
              class="fadein-down"
              style="color:#f66c1f;margin:20px;width:285px;margin-right:20px;margin-top:-10px;margin-bottom:4px"
            >
              Login</v-btn
            >
          </v-img>
        </v-main>

        <v-main class="hidden-md-and-down" style="background:#f66c1f">
          <v-img
            src="https://res.cloudinary.com/tell/image/upload/v1604278195/tellbooks5_offvdu.png"
            aspect-ratio="2.05"
          >
            <h1
              style="padding-top:430px;font-size:55px;line-height:normal;margin:20px"
              class="font-weight-black white--text"
            >
              Get Started Today!
            </h1>
            <p
              style="font-size:20px;line-height:normal;margin:20px;margin-top:-15px;margin-bottom:30px"
              class="white--text font-weight-semibold"
            >
              Create a free tellbooks account in less than a minute.
            </p>
            <v-btn
              to="/signup"
              color="white"
              class="fadein-down"
              outlined
              style="color:#f66c1f;margin:20px;width:285px;margin-right:20px;margin-top:-10px;margin-bottom:4px"
              >Sign Up</v-btn
            >
            <v-btn
              to="/login"
              color="white"
              class="fadein-down"
              style="color:#f66c1f;margin:20px;width:285px;margin-right:20px;margin-top:-10px;margin-bottom:4px"
            >
              Login</v-btn
            >
          </v-img>
        </v-main>
      </v-app>
    </v-window-item>
  </v-window>
</template>

<script>
import firebase from "firebase/app";

export default {
  data() {
    return {
      step: 1
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      if (this.user) this.$router.push("/dashboard");
    });
  }
};
</script>

<style scoped>
.somestyle {
  background-image: url(https://res.cloudinary.com/tell/image/upload/v1604278196/tellbooks_mluam5.png);
}
@media only screen and (max-width: 1000px) {
  .somestyle {
    background-position: center;
    background-size: cover;
  }
}
@media only screen and (min-width: 960px) {
  .somestyle {
    background-size: cover;
  }
}

.somestyl {
  background-image: url(https://res.cloudinary.com/tell/image/upload/v1604278192/tellbooks6_w9tg1e.png);
}
@media only screen and (max-width: 1000px) {
  .somestyl {
    background-position: center;
    background-size: cover;
  }
}
@media only screen and (min-width: 960px) {
  .somestyl {
    background-size: cover;
  }
}

.somesty {
  background-image: url(https://res.cloudinary.com/tell/image/upload/v1604278365/tellbooks2_x1toon.png);
}
@media only screen and (max-width: 1000px) {
  .somesty {
    background-position: center;
    background-size: cover;
  }
}
@media only screen and (min-width: 960px) {
  .somesty {
    background-size: cover;
  }
}

.somest {
  background-image: url(https://res.cloudinary.com/tell/image/upload/v1604278195/tellbooks3_pjmsx8.png);
}
@media only screen and (max-width: 1000px) {
  .somest {
    background-position: center;
    background-size: cover;
  }
}
@media only screen and (min-width: 960px) {
  .somest {
    background-size: cover;
  }
}

.somes {
  background-image: url(https://res.cloudinary.com/tell/image/upload/v1604278195/tellbooks5_offvdu.png);
}
@media only screen and (max-width: 1000px) {
  .somes {
    background-position: center;
    background-size: cover;
  }
}
@media only screen and (min-width: 960px) {
  .somes {
    background-size: cover;
  }
}

.fade-in {
  animation: fadeIn 3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadein-down {
  animation: fadeInDown 3s;
}

@keyframes fadeInDown {
  from {
    top: -2px;
    opacity: 0;
  }
  to {
    top: 0px;
    opacity: 1;
  }
}
</style>
