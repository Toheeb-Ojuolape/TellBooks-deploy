<template>
  <v-app v-if="book != undefined">
    <v-card>
      <v-toolbar class="md-4 hidden-md-and-down ">
        <v-btn
          @click="goBack"
          class="ml-16"
          color="#f66c1f"
          style="color:white"
        >
          <v-icon color="white">mdi-chevron-left</v-icon>Back
        </v-btn>
        <v-toolbar-title
          class="mx-14 my-5"
          height="500px"
          style="font-size:17px"
        >
          {{ bookName }}
        </v-toolbar-title>

        <v-spacer />

        <v-btn fab text>
          <v-icon class="green--text">mdi-magnify</v-icon>
        </v-btn>

        <v-btn
          rounded
          elevation="24"
          to="/publish"
          color="#f66c1f"
          class="white--text mr-5"
          style="font-size:15px;"
        >
          <v-icon class="mr-1">mdi-plus-circle-outline</v-icon>Publish Book
        </v-btn>
      </v-toolbar>

      <v-toolbar class="md-4 hidden-lg-and-up" color="#f66c1f">
        <v-btn @click="goBack" style="color:white" text>
          <v-icon color="white">mdi-chevron-left</v-icon>Back
        </v-btn>

        <v-spacer />

        <v-btn icon to="/shelf">
          <v-icon class="white--text">mdi-magnify</v-icon>
        </v-btn>

        <v-btn
          rounded
          elevation="24"
          to="/publish"
          color="white"
          class=" mr-5"
          style="font-size:15px;color:#f66c1f"
        >
          <v-icon class="mr-1" color="#f66c1f">mdi-plus-circle-outline</v-icon
          >Publish
        </v-btn>
      </v-toolbar>
    </v-card>
    <NavBar />
    <v-container>
      <!-- Display Information about the book start -->
      <v-row class="hidden-md-and-down">
        <v-card
          cols="12"
          lg="4"
          md="4"
          elevation="24"
          :src="book.bookcover"
          height="320px"
          width="210px"
          class="mt-7"
        >
          <v-img :src="book.bookcover" height="320px" width="210px" />
        </v-card>
        <v-col lg="8" md="8" class="ml-4">
          <h2 style="font-size:32px;margin-top:10px" class="font-weight-black">
            {{ book.title }}
          </h2>

          <router-link
            style="text-decoration:none;margin-left:0px;font-size:16px;color:#f66c1f"
            :to="`/author/${book.author}`"
          >
            by {{ book.author }}
          </router-link>
          <p
            style="font-size:14px;padding-top:7px"
            v-if="book.coauthor != null"
          >
            Coauthor(s): {{ book.coauthor }}
          </p>
          <div
            style="font-size:13px;margin-top:7px;margin-left:5px"
            v-if="readers != undefined"
          >
            <v-icon>mdi-book-open-page-variant</v-icon>
            <p style="margin-left:7px">{{ readers.length }}</p>
          </div>

          <div style="font-size:13px" v-else>
            <v-icon>mdi-book-open-page-variant</v-icon>
            <p style="margin-left:7px">0</p>
          </div>
          <v-spacer />
          <div
            style="font-size:12px;margin-left:75px;margin-top:-58px"
            v-if="readers != undefined"
          >
            <v-icon>mdi-comment-multiple-outline</v-icon>
            <p style="margin-left:7px">{{ reviews.length }}</p>
          </div>
          <div style="font-size:13px;margin-top:-12px;margin-left:7px">
            Rating:
            <v-rating
              small
              readonly
              color="#f5a623"
              style="margin-left:-10px;margin-top:-5px"
              :value="parseFloat(totalrating / reviews.length)"
            />
          </div>

          <v-btn
            v-if="book.filetype == 'Epub'"
            small
            rounded
            color="#f6b911"
            class="white--text"
          >
            {{ book.filetype }}
          </v-btn>
          <v-btn v-else small rounded color="#e00000" class="white--text">
            {{ book.filetype }}
          </v-btn>
          <v-btn
            :to="`/category/${book.category}`"
            v-if="book.filetype == 'Epub'"
            small
            rounded
            color="#f6b911"
            class="white--text"
          >
            {{ book.category }}
          </v-btn>
          <v-btn
            :to="`/category/${book.category}`"
            v-else
            small
            rounded
            color="#e00000"
            class="white--text"
          >
            {{ book.category }}
          </v-btn>

          <div style="font-size:14px;margin-top:9px;margin-bottom:29px">
            About:<br />
            {{ book.description }}
          </div>

          <v-btn
            v-if="notUser"
            style="font-size:9px;margin-top:10px"
            color="#f66c1f"
            to="/notlogged"
            class="my-5 white--text font-weight-black body-2"
          >
            Buy for {{ book.currency }} {{ book.price }}
          </v-btn>

          <v-btn
            v-if="yesUser"
            style="font-size:9px;margin-top:10px"
            color="#f66c1f"
            @click="dialog = true"
            class="my-5 white--text font-weight-black body-2"
          >
            Buy for {{ book.currency }} {{ book.price }}
          </v-btn>

          <v-btn
            v-if="paidUser"
            style="font-size:9px;margin-top:10px"
            color="#f66c1f"
            :to="`/${book.filetype}/${book.slug}`"
            class="my-5 white--text font-weight-black body-2"
          >
            Read Now
          </v-btn>

          <v-btn
            v-if="notfreeUser"
            class="white---text font-weight-bold body-2"
            style="font-size:16px;color:white"
            color="#f66c1f"
            to="/signup"
          >
            Add To Library
          </v-btn>

          <v-btn
            v-if="freeUser"
            class="white---text font-weight-bold body-2"
            style="font-size:16px;color:white"
            color="#f66c1f"
            @click="addToLibrary"
          >
            Add To Library
          </v-btn>

          <v-btn
            v-if="freepaidUser"
            style="font-size:16px"
            color="#f66c1f"
            :to="`/${book.filetype}/${book.slug}`"
            class="white--text font-weight-bold body-2"
          >
            Read Now
          </v-btn>

          <v-btn
            v-if="book.price != 0"
            color="#f66c1f"
            outlined
            dark
            @click="giftlog"
            style="margin-left:15px"
            ><v-icon>mdi-gift</v-icon> Gift this book
          </v-btn>

          <v-btn
            small
            fab
            color="#008140"
            v-if="notfreeUser && book.downloadable == 'Yes'"
            style="margin-left:5px"
            to="/notloggedin"
          >
            <v-icon color="white">mdi-cloud-download</v-icon>
          </v-btn>

          <v-btn
            small
            fab
            color="#008140"
            v-if="freeUser && book.downloadable == 'Yes'"
            style="margin-left:5px"
            :href="book.book"
          >
            <v-icon color="white">mdi-cloud-download</v-icon>
          </v-btn>

          <v-btn
            small
            fab
            color="#008140"
            v-if="freepaidUser && book.downloadable == 'Yes'"
            style="margin-left:5px"
            :href="book.book"
          >
            <v-icon color="white">mdi-cloud-download</v-icon>
          </v-btn>

          <v-card flat class="mt-6">
            <v-btn
              dark
              fab
              color="#1773ea"
              x-small
              :href="`https://facebook.com/sharer/sharer.php?u=${pageUrl}`"
              target="_blank"
              right
              bottom
            >
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn
              dark
              fab
              color="green"
              x-small
              :href="
                `https://wa.me/?text=Read%20${book.title}%20by%20${book.author}%20on%20tellbooks%20${pageUrl}`
              "
              target="_blank"
              right
              bottom
            >
              <v-icon>mdi-whatsapp</v-icon>
            </v-btn>
            <v-btn
              dark
              fab
              color="#1da1f2"
              x-small
              :href="
                `https://twitter.com/intent/tweet?text=Read%20${book.title}%20by%20${book.author}%20on%20tellbooks&url=${pageUrl}`
              "
              target="_blank"
              right
              bottom
            >
              <v-icon>mdi-twitter</v-icon>
            </v-btn>

            <v-btn
              dark
              fab
              color="#2663ac"
              x-small
              :href="
                `https://www.linkedin.com/shareArticle?mini=true&title=Read%20${book.title}%20by%20${book.author}%20on%20tellbooks&url=${pageUrl}`
              "
              target="_blank"
              right
              bottom
            >
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </v-card>

          <!-- Display Information about the book ends here -->

          <!-- Start of sharing buttons -->
          <v-speed-dial
            v-model="dialShare"
            absolute
            right
            bottom
            direction="top"
            open-on-hover
          >
            <template v-slot:activator>
              <v-btn
                fab
                bottom
                x-large
                fixed
                color="#1773ea"
                style="margin-left:-80px"
              >
                <v-icon v-if="dialShare" class="white--text">mdi-close</v-icon>
                <v-icon v-else class="white--text">mdi-share-variant</v-icon>
              </v-btn>
            </template>
            <v-btn
              dark
              fab
              fixed
              bottom
              color="#1773ea"
              small
              :href="`https://facebook.com/sharer/sharer.php?u=${pageUrl}`"
              target="_blank"
              style="margin-left:-65px;margin-bottom:80px"
            >
              <v-icon>mdi-facebook</v-icon>
            </v-btn>

            <v-btn
              dark
              fab
              fixed
              bottom
              color="green"
              small
              :href="
                `https://wa.me/?text=Read%20${book.title}%20by%20${book.author}%20on%20tellbooks%20${pageUrl}`
              "
              target="_blank"
              style="margin-left:-65px;margin-bottom:130px"
            >
              <v-icon>mdi-whatsapp</v-icon>
            </v-btn>

            <v-btn
              dark
              fab
              fixed
              bottom
              color="#1da1f2"
              small
              :href="
                `https://twitter.com/intent/tweet?text=Read%20${book.title}%20by%20${book.author}%20on%20tellbooks&url=${pageUrl}`
              "
              target="_blank"
              style="margin-left:-65px;margin-bottom:180px"
            >
              <v-icon>mdi-twitter</v-icon>
            </v-btn>

            <v-btn
              dark
              fab
              fixed
              bottom
              color="#2663ac"
              small
              :href="
                `https://www.linkedin.com/shareArticle?mini=true&title=Read%20${book.title}%20by%20${book.author}%20on%20tellbooks&url=${pageUrl}`
              "
              target="_blank"
              style="margin-left:-65px;margin-bottom:230px"
            >
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </v-speed-dial>

          <!-- End of sharing button -->

          <!-- This handles gifting -->

          <!-- End of gifting feature -->
        </v-col>
      </v-row>

      <!-- Mobile view -->
      <v-row class="hidden-lg-and-up">
        <v-card
          cols="12"
          lg="5"
          md="5"
          elevation="24"
          :src="book.bookcover"
          height="170px"
          width="120px"
          class="mt-7 ml-3"
        >
          <v-img :src="book.bookcover" height="195px" width="130px" />
        </v-card>
        <v-col lg="7" md="7" class="ml-4 mt-1">
          <h2 style="font-size:19px;margin-top:10px" class="font-weight-black">
            {{ book.title }}
          </h2>

          <router-link
            style="text-decoration:none;font-size:14px;color:#f66c1f;margin-left:0px"
            :to="`/author/${book.author}`"
          >
            by {{ book.author }}
          </router-link>
          <p
            style="font-size:11px;padding-top:7px"
            v-if="book.coauthor != null"
          >
            Coauthor(s): {{ book.coauthor }}
          </p>
          <div
            style="font-size:12px;margin-top:11px;"
            v-if="readers != undefined"
          >
            <p>
              <v-icon small>mdi-book-open-page-variant</v-icon>
              {{ readers.length }}
            </p>
          </div>

          <div style="font-size:12px;margin-top:11px;" v-else>
            <p><v-icon small>mdi-book-open-page-variant</v-icon>0</p>
          </div>
          <v-spacer />
          <div
            style="font-size:12px;margin-left:43px;margin-top:-34px"
            v-if="readers != undefined"
          >
            <p>
              <v-icon small>mdi-comment-multiple-outline</v-icon>
              {{ reviews.length }}
            </p>
          </div>
          <div style="font-size:13px;margin-top:-36px;margin-left:-7px">
            <br />
            <v-rating
              size="9"
              color="#f5a623"
              readonly
              :value="parseFloat(book.rating)"
            />
          </div>
          <v-btn
            v-if="book.filetype == 'Epub'"
            x-small
            rounded
            color="#f6b911"
            class="white--text"
          >
            {{ book.filetype }}
          </v-btn>
          <v-btn v-else x-small rounded color="#e00000" class="white--text">
            {{ book.filetype }}
          </v-btn>
          <v-btn
            :to="`/category/${book.category}`"
            v-if="book.filetype == 'Epub'"
            x-small
            rounded
            color="#f6b911"
            class="white--text"
          >
            {{ book.category }}
          </v-btn>
          <v-btn
            v-else
            :to="`/category/${book.category}`"
            x-small
            rounded
            color="#e00000"
            class="white--text"
          >
            {{ book.category }} </v-btn
          ><br />

          <v-btn
            v-if="notUser"
            style="font-size:9px;margin-top:10px"
            color="#f66c1f"
            to="/notlogged"
            class="my-5 white--text font-weight-black body-2"
          >
            Buy for {{ book.currency }} {{ book.price }}
          </v-btn>

          <v-btn
            v-if="yesUser"
            style="font-size:9px;margin-top:10px"
            color="#f66c1f"
            @click="dialog = true"
            class="my-5 white--text font-weight-black body-2"
          >
            Buy for {{ book.currency }} {{ book.price }}
          </v-btn>

          <v-btn
            v-if="paidUser"
            style="font-size:9px;margin-top:10px"
            color="#f66c1f"
            :to="`/${book.filetype}/${book.slug}`"
            class="my-5 white--text font-weight-black body-2"
          >
            Read Now
          </v-btn>

          <v-btn
            v-if="notfreeUser"
            style="font-size:9px;margin-top:10px"
            class="my-5 white--text font-weight-black body-2"
            color="#f66c1f"
            to="/notloggedin"
          >
            Add To Library
          </v-btn>

          <v-btn
            v-if="freeUser"
            class="my-5 white--text font-weight-black body-2"
            style="font-size:9px;margin-top:10px"
            color="#f66c1f"
            @click="addToLibrary"
          >
            Add To Library
          </v-btn>

          <v-btn
            v-if="freepaidUser"
            style="font-size:9px;margin-top:10px"
            color="#f66c1f"
            :to="`/${book.filetype}/${book.slug}`"
            class="my-5 white--text font-weight-black body-2"
          >
            Read Now
          </v-btn>

          <v-btn
            v-if="book.price != 0"
            color="#f66c1f"
            outlined
            dark
            @click="giftlog"
            style="margin-top:10px;margin-bottom:14px;margin-left:4px"
            ><v-icon>mdi-gift</v-icon>
            Gift
          </v-btn>
          <v-btn
            small
            fab
            color="#008140"
            v-if="notfreeUser && book.downloadable == 'Yes'"
            style="margin-left:5px"
            to="/notloggedin"
          >
            <v-icon color="white">mdi-cloud-download</v-icon>
          </v-btn>

          <v-btn
            small
            fab
            color="#008140"
            v-if="freeUser && book.downloadable == 'Yes'"
            style="margin-left:5px"
            :href="book.book"
          >
            <v-icon color="white">mdi-cloud-download</v-icon>
          </v-btn>

          <v-btn
            small
            fab
            color="#008140"
            v-if="freepaidUser && book.downloadable == 'Yes'"
            style="margin-left:5px"
            :href="book.book"
          >
            <v-icon color="white">mdi-cloud-download</v-icon>
          </v-btn>

          <v-card flat>
            <v-btn
              dark
              fab
              color="#1773ea"
              x-small
              :href="`https://facebook.com/sharer/sharer.php?u=${pageUrl}`"
              target="_blank"
              right
              bottom
            >
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn
              dark
              fab
              color="green"
              x-small
              :href="
                `https://wa.me/?text=Read%20${book.title}%20by%20${book.author}%20on%20tellbooks%20${pageUrl}`
              "
              target="_blank"
              right
              bottom
            >
              <v-icon>mdi-whatsapp</v-icon>
            </v-btn>
            <v-btn
              dark
              fab
              color="#1da1f2"
              x-small
              :href="
                `https://twitter.com/intent/tweet?text=Read%20${book.title}%20by%20${book.author}%20on%20tellbooks&url=${pageUrl}`
              "
              target="_blank"
              right
              bottom
            >
              <v-icon>mdi-twitter</v-icon>
            </v-btn>

            <v-btn
              dark
              fab
              color="#2663ac"
              x-small
              :href="
                `https://www.linkedin.com/shareArticle?mini=true&title=Read%20${book.title}%20by%20${book.author}%20on%20tellbooks&url=${pageUrl}`
              "
              target="_blank"
              right
              bottom
            >
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </v-card>

          <!-- Display Information about the book ends here -->

          <!-- Start of sharing buttons -->

          <!-- End of sharing button -->

          <!-- This handles gifting -->

          <!-- End of gifting feature -->
        </v-col>
      </v-row>
      <div
        class="hidden-lg-and-up"
        style="padding:9px;font-size:14px;margin-top:12px;margin-bottom:px"
      >
        <h1
          class="font-weight-black body-1"
          style="font-size:21px;text-align:left"
        >
          ABOUT THE BOOK
        </h1>
        <hr width="28%" />
        {{ book.description }}
      </div>

      <!-- This handles how comments appear on the page -->
      <p
        v-if="user == null"
        style="font-size:18px;text-align:center;padding-top:55px"
        class="font-weight-light"
      >
        Please
        <router-link
          to="/notloggedin"
          style="color:#1773ea;text-decoration:none"
          >login</router-link
        >
        or
        <router-link to="/notlogged" style="color:#1773ea;text-decoration:none"
          >create an account</router-link
        >
        to leave a review
      </p>
      <p
        v-if="user != null"
        style="font-size:18px;padding-top:55px;margin-bottom:0px;padding-left:10px"
        class="font-weight-light"
      >
        Leave a review
      </p>
      <hr style="margin-left:10px;color:black" width="80px" />

      <v-card flat class="px-40" width="83%">
        <v-form
          v-if="user != null"
          style="margin-left:9px;"
          @submit.prevent="submitted"
        >
          <v-rating
            half-increments
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            v-model="rating"
          ></v-rating>
          <v-textarea
            v-model="newReview"
            name="review"
            label="Leave a review"
            color="yellow darken-3"
            outlined
          />
          <v-btn @click="submitted" :disabled="rating == 0" color="#f66c1f" class="white--text">
            Submit Review
          </v-btn>
        </v-form>
      </v-card>
      <v-card flat width="85%" class="my-7 mr-13" style="margin-left:-17px">
        <ol>
          <li
            style="text-decoration:none"
            v-for="(review, index) in reviews"
            :key="index"
          >
            <v-card elevation="15" class="pa-4 mt-4">
              <div style="font-size:16px">
                <v-avatar
                  width="40px"
                  height="40px"
                  style="padding-left:-30px;margin:5px"
                >
                  <img :src="review.photoURL"/></v-avatar
                >{{ review.from }}
                <p
                  style="color:grey;font-size:9px; margin-left:60px;margin-top:-18px"
                >
                  {{ review.timestamp }}
                </p>
              </div>
              <v-rating
                half-increments
                readonly
                v-model="review.rating"
                color="yellow darken-3"
                x-small
                style="margin-top:-20px;margin-left:5px"
              ></v-rating>
              <p style="font-size:15px;color:grey;margin-left:16px">
                {{ review.review }}
              </p>
            </v-card>
          </li>
        </ol>
      </v-card>
      <!-- End of how comments appear on the page -->
      <!-- End of book page appearance -->

      <!-- Related books -->
      <h1 class="headline font-weight-bold hidden-md-and-down ml-2">
        Related Books
      </h1>
      <v-row class="hidden-md-and-down">
        <p
          cols="12"
          md="3"
          sm="3"
          xs="3"
          lg="3"
          style="margin-left:19px;margin-top:25px;margin-bottom:200px"
          v-for="(b, i) in related"
          :key="i"
        >
          <v-card elevation="24" height="250" width="170">
            <v-img
              :src="b.bookcover"
              height="250"
              width="170"
              @click="bookPage(i, b)"
            />
          </v-card>
          <v-rating
            small
            readonly
            color="#f5a623"
            :value="parseFloat(b.rating)"
          ></v-rating>
        </p>
      </v-row>

      <h1
        class="font-weight-bold hidden-lg-and-up"
        style="font-size:18px;margin-bottom:-10px;padding-left:10px"
      >
        Related Books
      </h1>

      <v-row v-if="loading">
        <v-col v-for="n in 3" :key="n">
          <v-skeleton-loader
            class="mb-6 mt-4"
            type="image,article"
            v-if="loading"
          ></v-skeleton-loader>
        </v-col>
      </v-row>

      <v-slide-group
        v-model="model"
        class="pa-2 mt-2 hidden-lg-and-up"
        active-class="success"
        show-arrows
        color="white"
        style="margin-left:-7px;margin-bottom:30px"
      >
        <v-slide-item
          v-for="(book, i) in related"
          :key="i"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            :color="active ? undefined : 'white'"
            class="ma-4"
            height="190"
            width="120"
            elevation="7"
            style="margin-bottom:20px"
            @click="toggle"
          >
            <v-img
              elevation="24"
              hover
              width="120px"
              height="190px"
              :src="book.bookcover"
              @click="bookPage(i, book)"
            />
            <v-rating
              color="#f5a623"
              size="9"
              readonly
              :value="parseFloat(book.rating)"
              class="margin-bottom:10px"
            ></v-rating>

            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="48"
                  v-text="'mdi-close-circle-outline'"
                ></v-icon>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>

      <!-- Related books -->
    </v-container>

    <!-- This is where all the dialog popup boxes will appear -->
    <!-- Payment Popup for buying books -->

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card v-if="user != null">
        <p
          class="font-weight-bold text-center"
          style="padding-top:18px;font-size:20px"
        >
          Pay using any of the following options
        </p>

        <v-card-actions class="justify-center">
          <flutterwave
            :is-production="isProduction"
            :name="user.displayName"
            :email="user.email"
            :amount="book.price"
            :reference="referenceFlutter"
            flw-key="FLWPUBK-f92a354d64f5b330062fe7928f4321f6-X"
            :callback="callbackFlutter"
            :close="close"
            :currency="book.currency"
            :country="country"
            :payment_method="paymentMethod"
          />
        </v-card-actions>

        <v-card-actions v-if="book.currency == 'NGN'" class="justify-center">
          <paystack
            :amount="book.price * 100"
            :email="user.email"
            :paystackkey="paystackkey"
            :reference="reference"
            :callback="callback"
            :close="close"
            :embed="false"
          >
            <v-btn color="#224068" class="white--text justify-center">
              Pay with Paystack
            </v-btn>
          </paystack>
        </v-card-actions>

        <v-card-actions class="justify-center">
          <v-btn
            color="#48c857"
            class="white--text justify-center"
            :href="
              `https://api.whatsapp.com/send?phone=2348167299743&text=Hi%20tellbooks.%20I%20would%20like%20to%20buy%20${book.title}%20by%20${book.author}%20for%20₦${book.price}.%20My%20name%20is`
            "
          >
            <v-icon
              class="white--text ma-2"
              :href="
                `https://api.whatsapp.com/send?phone=2348167299743&text=Hi%20tellbooks.%20I%20would%20like%20to%20buy%20${book.title}%20by%20${book.author}%20for%20₦${book.price}.%20My%20name%20is`
              "
              >mdi-whatsapp</v-icon
            >Pay with WhatsApp
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- End of payment dialog -->

    <!-- After adding free book to library -->
    <v-dialog v-model="freeCompleted" max-width="370" max-height="500">
      <v-card class="text-center" color="#f66c1f">
        <v-icon center style="margin-top:30px" color="white" size="80px"
          >mdi-checkbox-marked-circle-outline</v-icon
        >
        <v-card-text class="headline white--text text-center mt-2"
          >{{ book.title }} has been added to your library!</v-card-text
        >

        <v-card-text class="text-center white--text">
          Click the button below to start reading
        </v-card-text>
        <v-card-text style="text-align:center">
          <v-spacer></v-spacer>

          <v-btn
            color="white"
            :to="`/${book.filetype}/${book.slug}`"
            class="black--text mb-6"
            style="text-align:center"
          >
            Read Now
          </v-btn>

          <v-btn
            color="white"
            outlined
            @click="freeCompleted = false"
            class="white--text mb-6 px-3 ml-5"
            style="text-align:center"
          >
            Close
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- End of completing adding free book to library -->

    <!-- After payment, here is what happens -->
    <v-dialog v-model="completed" max-width="370" max-height="500">
      <v-card class="text-center" color="#f66c1f">
        <v-icon center style="margin-top:30px" color="white" size="80px"
          >mdi-checkbox-marked-circle-outline</v-icon
        >
        <v-card-text class="headline white--text text-center mt-2"
          >{{ book.title }} has been added to your library!</v-card-text
        >

        <v-card-text class="text-center white--text">
          Click the button below to start reading
        </v-card-text>
        <v-card-text style="text-align:center">
          <v-spacer></v-spacer>

          <v-btn
            color="white"
            :to="`/${book.filetype}/${book.slug}`"
            class="black--text mb-6"
            style="text-align:center"
          >
            Read Now
          </v-btn>

          <v-btn
            color="white"
            outlined
            @click="completed = false"
            class="white--text mb-6 px-3 ml-5"
            style="text-align:center"
          >
            Close
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Log users in popup -->

    <!-- This popup handles payment for gift -->
    <v-dialog v-model="giftdialog" max-width="510" max-height="500">
      <v-card class="pa-5 text-center" v-if="user != null">
        <p class="font-weight-bold" style="font-size:17px">
          Pay using any of the following options
        </p>
        <v-card-actions v-if="book.currency == 'NGN'" class="justify-center">
          <paystack
            :amount="book.price * 100"
            :email="user.email"
            :paystackkey="paystackkey"
            :reference="referencegift"
            :callback="callbackgift"
            :close="close"
            :embed="false"
          >
            <v-btn color="#224068" class="white--text justify-center">
              Pay with Paystack
            </v-btn>
          </paystack>
        </v-card-actions>
        <v-card-actions class="justify-center">
          <v-btn
            color="#48c857"
            class="white--text justify-center"
            :href="
              `https://api.whatsapp.com/send?phone=2348167299743&text=Hi%20tellbooks.%20I%20would%20like%20to%20buy%20${book.title}%20by%20${book.author}%20for%20₦${book.price}.%20My%20name%20is`
            "
          >
            <v-icon
              class="white--text ma-2"
              :href="
                `https://api.whatsapp.com/send?phone=2348167299743&text=Hi%20tellbooks.%20I%20would%20like%20to%20gift%20${book.title}%20by%20${book.author}%20for%20₦${book.price}.%20My%20name%20is`
              "
              >mdi-whatsapp</v-icon
            >Pay with WhatsApp
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="giftdialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of gift payment popup -->

    <!-- After gift payment, input beneficiary's name -->
    <v-dialog v-model="giftPop" max-width="370" max-height="500" persistent>
      <v-card class="text-center" color="#f66c1f">
        <v-icon center style="margin-top:30px" color="white" size="50px"
          >mdi-checkbox-marked-circle-outline</v-icon
        >
        <v-card-text class="white--text text-center mt-2" style="font-size:23px"
          >Payment Successfully!</v-card-text
        >

        <v-card-text class="text-center white--text">
          Kindly enter the Tell! Books username (case) of the person you bought
          the book for
        </v-card-text>
        <v-text-field
          v-model="name"
          color="white"
          class="white--text px-5"
          label="Enter Beneficiary's username"
        />
        <v-card-actions style="text-align:center">
          <v-spacer></v-spacer>

          <v-btn
            color="white"
            @click="addGift"
            class="blue--text mb-3 px-3 mx-5"
            :loading="loading"
          >
            Gift Book
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of assigning gift to beneficiary -->

    <!-- After assigning gift to beneficiary -->
    <v-dialog v-model="giftcompleted" max-width="370" max-height="500">
      <v-card class="text-center" color="#f66c1f">
        <v-icon center style="margin-top:30px" color="white" size="50px"
          >mdi-checkbox-marked-circle-outline</v-icon
        >
        <v-card-text class="white--text text-center mt-2" style="font-size:23px"
          >Gift delivered Successfully!</v-card-text
        >

        <v-card-text class="text-center white--text">
          This book has been added to your beneficiary's gift tab in their
          dashboard. Tell them to login and check it out!
        </v-card-text>
        <v-card-actions style="text-align:center">
          <v-spacer></v-spacer>

          <v-btn
            color="white"
            @click="giftcompleted = false"
            class="blue--text mb-6"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of entire gifting process -->
    <v-dialog v-model="snackbar" width="300px">
      <v-card color="red" class="pa-5">
        <p style="font-size:16px;text-align:center;color:white">{{ error }}</p>

        <v-btn
          color="white"
          text
          @click="snackbar = false"
          style="font-size:12px"
        >
          Try again
        </v-btn>
      </v-card>
    </v-dialog>
    <BottomMenu v-if="user != null" />
  </v-app>
  <v-app v-else style="text-align:center">
    <v-content style="background:#f66c1f">
      <h1
        class="font-weight-bold white--text"
        style="margin:20px;font-size:42px;padding-top:270px"
      >
        Sorry, this page does not exist
      </h1>
      <p style="font-size:19px;color:white">
        But you can still find your way back home
      </p>
      <v-btn x-large outlined color="white" style="margin-top:30px" to="/shelf">
        Go Home</v-btn
      >
    </v-content>
  </v-app>
</template>

<script>
import "firebase/auth";
import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import Loadscript from "vue-plugin-load-script"
import firebase from "firebase/app";
import "firebase/firestore";
import paystack from "vue-paystack";
import Flutterwave from "@/components/FlutterwaveModal.vue";
import db from "../main";
import slugify from "slugify";
import BottomMenu from "@/components/BottomMenu";
import NavBar from "@/components/NavBar";
import moment from "moment";

export default {
  components: {
    paystack,
    Flutterwave,
    BottomMenu,
    NavBar,
  },
  data() {
    return {
      user: "",
      dialShare: false,
      buttonText: "",
      model: null,
      pageUrl: window.location.href,
      paystackkey: "pk_live_d9516c4c9ed7efe222ec1a27c8eb5ad049d2eeab", //paystack public key
      paystackRef: "",
      paystackgift: "",
      giftPop: false,
      giftdialog: false,
      giftcompleted: false,
      name: "",
      flutterwaveRef: "",
      book: "",
      category: "",
      price: "",
      readers: [],
      dialog: false,
      amount: "",
      newReview: null,
      from: null,
      reviews: [],
      isProduction: "",
      flwKey: "FLWPUBK-f92a354d64f5b330062fe7928f4321f6-X",
      currency: "NGN",
      country: "",
      paymentMethod: "",
      successUrl: window.location.href,
      cancelUrl: window.location.href,
      loading: false,
      token: null,
      charge: null,
      rating: 0,
      totalrating: 0,
      freeCompleted: false,
      completed: false,
      snackbar: false,
      error: "",
      related: [],
      IDs: [],
      relatedrating: [],
      bookName: this.$route.params.id,
      recipient: "",
      giftMail: "",
      pointer: "",
      notUser: false,
      notfreeUser: false,
      yesUser: false,
      paidUser: false,
      freeUser: false,
      freepaidUser: false,
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    // ...mapGetters({
    //   user: "user"
    // }),

    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    },
    referencegift() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    },
    referenceFlutter() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    },
  },
  watch: {
    paystackRef() {
      this.changesInDatabase();
    },
    paystackgift() {
      this.giftBook();
    },
    flutterwaveRef() {
      this.changesInDatabase();
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
    });
  },
  //fetching the  book's details
  created() {
    const backNormal = document.querySelectorAll(".normal");
    if (backNormal.length > 0) {
      location.reload();
    }

    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;

      db.collection("books")
        .doc(this.bookName)
        .get()
        .then((books) => {
          this.book = books.data();
          this.category = books.data().category;
          this.readers = books.data().readers;
          this.bookID = books.id;

          db.collection("books")
            .where("category", "==", this.category)
            .limit(3)
            .onSnapshot((querySnapshot) => {
              this.related = [];
              querySnapshot.forEach((doc) => {
                this.related.push(doc.data());
                this.IDs.push(doc.id);
                this.relatedrating += doc.data().rating;
              });
            });
        })
        .then(() => {
          if (this.book.price != 0 && this.user == null) {
            this.notUser = true;
          } else if (
            this.book.price != 0 &&
            this.user != null &&
            !this.book.readers.includes(this.user.uid)
          ) {
            this.yesUser = true;
          } else if (
            this.book.price != 0 &&
            this.user != null &&
            this.readers.includes(this.user.uid)
          ) {
            this.paidUser = true;
          } else if (this.book.price == 0 && this.user == null) {
            this.notfreeUser = true;
          } else if (
            this.book.price == 0 &&
            this.user != null &&
            !this.book.readers.includes(this.user.uid)
          ) {
            this.freeUser = true;
          } else if (
            this.book.price == 0 &&
            this.user != null &&
            this.book.readers.includes(this.user.uid)
          ) {
            this.freepaidUser = true;
          }
        });
    });

    db.collection("reviews")
      .where("on", "==", this.bookName)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            this.reviews.unshift({
              from: change.doc.data().from,
              photoURL: change.doc.data().photoURL,
              rating: change.doc.data().rating,
              review: change.doc.data().review,
              timestamp: moment(change.doc.data().timestamp).format("LLL"),
            });
            this.totalrating += change.doc.data().rating;
          }
        });
      });
  },

  metaInfo() {
    return {
      title: `Read ${this.book.title} by ${this.book.author}`,
      titleTemplate: " Tell! Books | %s",
      meta: [
        {
          name: "description",
          content:
            "Read more books by" +
            this.book.author +
            " on Tell! Books | Top Online African Book publishing platform",
        },
        { property: "og:title", content: this.book.title + " | Tell! Books" },
        { property: "og:site_name", content: "Tell! Books" },
        {
          property: "og:description",
          content:
            "Read more books by" +
            this.book.title +
            " on Tell! Books | African Book publishing platform ",
        },
        { property: "og:type", content: "profile" },
        {
          property: "og:url",
          content: "https://books.tell.africa/" + this.book.title,
        },
        { property: "og:image", content: this.book.bookcover },
      ],
    };
  },

  //Leaving a comment
  methods: {
    makePayment() {
      window.FlutterwaveCheckout({
        public_key: this.flwKey,
        tx_ref: this.reference,
        amount: this.amount,
        currency: this.currency,
        payment_options: this.payment_method,
        customer: {
          name: this.name,
          email: this.email,
        },
        callback: (response) => this.callback(response),
        customizations: {
          title: this.custom_title,
          description: "Payment for items in cart",
          logo: this.custom_logo,
        },
      });
    },

    giftlog() {
      if (this.user != null) {
        this.giftdialog = true;
      } else if (this.user == null) {
        this.router.push("/notlogin")
      }
    },
    bookPage(i, b) {
      this.bookID = this.IDs[i];
      this.$router.push({
        name: "Books",
        params: { id: b.slug, book: b, bookID: this.bookID },
      });
      location.reload();
    },

    changesInDatabase() {
      this.pointer = slugify(this.user.displayName, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true,
      });

      db.collection("books")
        .doc(this.$route.params.id)
        .update({
          readers: firebase.firestore.FieldValue.arrayUnion(this.user.uid),
        })
        .then(() => {
          db.collection("users")
            .doc(this.pointer)
            .update({
              books: firebase.firestore.FieldValue.arrayUnion(this.bookID),
            });
        })
        .then(() => {
          this.completed = true;
          this.dialog = false;
          this.loading = false;
        })
        .then(() => {
          Vue.loadScript("https://smtpjs.com/v3/smtp.js").then(() => {
            // eslint-disable-next-line no-undef
            Email.send({
              SecureToken: "ac498295-32fa-4869-839c-42afcca0ca2b",
              To: `${this.book.email}`,
              From: "Teniola from Tell! Books | books@tell.africa",
              Subject: `${this.user.displayName} just bought your book, ${this.book.title}`,
              Body: `<div style="color: #444444; font-weight: normal;">
  <div style="max-width: 560px; padding: 20px; background: #ffffff; border-radius: 5px; margin: 40px auto; font-family: Source Sans Pro,Source Sans Serif; font-size: 15px; color: #666;">
  <div style="color: #444444; font-weight: normal;">
  <div style="text-align: center; font-weight: 400; font-size: 15px; padding-top: 10px; padding-right: 0px; padding-bottom: 10px; border-bottom: 3px solid #eeeeee; margin-bottom: 1em;">
  <p style="color: #444444;"><img class="alignnone wp-image-27004" src="https://tell.africa/wp-content/uploads/2019/03/Webp.net-resizeimage-3.png" alt="" width="40" height="40" /></p>
  <p style="text-align: left;">1 min read |</p>
  
  <h2 style="color: #666666; text-align: left;"><span style="color: #000000;">Hi ${this.book.author}<strong>,</strong></span></h2>
  <p style="text-align: left;">${this.user.displayName} just bought your book, ${this.book.title} ,on Tell! Books.</p><br>
  <p style="text-align:left"> To withdraw or view your earnings, click the button below</p>
  
  <br>
  
  <p style="text-align:center"><span style="color: #000000;"><strong><span style="color: #ffffff;"><a style="background: #0f961f; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 3px; letter-spacing: 0.3px;" href="https://books.tell.africa/wallet">View Earnings</a></span></strong></span></p><br>
  
  
  
  <p style="text-align:left">If you need any support, kindly send us an email at <a href="mailto:books@tell.africa">books@tell.africa </a>or send us a message on WhatsApp by clicking the button below:</p> <br>
  
  <p style="text-align:center"><span style="color: #000000;"><strong><span style="color: #ffffff;"><a style="background: #0f961f; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 3px; letter-spacing: 0.3px;" href="https://api.whatsapp.com/send?phone=2348167299743&amp;text=Hi%20tellbooks.%20I%20need%20to%20talk%20to%20a%20customer%20support%20representative.%20My%20name%20is%20">WhatsApp Us</a></span></strong></span></p>
  
  &nbsp;
  <div style="color: #666666; font-weight: normal;"><span style="color: #ffffff;">.</span></div>
  <div style="color: #666666; text-align: left;"><span style="color: #000000;">Kind Regards 💚 , </span></div>
  <div style="color: #666666; text-align: left;"><span style="color: #000000;">Teniola</span></div>
  <div style="color: #666666; text-align: left; font-size:13px"><span style="font-size:11px; color: #000000;"><i>Customer Happiness Rep @ Tell! Books</i></span></div>
  <div style="color: #666666; font-weight: normal;"></div>
  <div style="font-weight: normal;"></div>
  <div style="color: #666666;">
  <div style="max-width: 560px; padding: 0px; background: #ffffff; border-radius: 5px; margin: 40px auto; font-family: Open Sans,Helvetica,Arial; font-size: 15px; color: #666;">
  <div style="border-bottom: 3px solid #eeeeee;">
  <div style="color: black; background:#0f961f;">
  <div style="background-color:#0f961f; color: black; text-align: center; padding: 30px 20px 90px 30px;">
  <p style="text-align: center; color: white;"><span style="color: #ffffff;"><strong>Follow us on Social Media:</strong></span></p>
  <p style="text-align: center; color: white;"><span style="color: #000000;"><a style="color: #000000;" href="https://facebook.com/tell.com.ng"><img class="alignnone wp-image-28420" src="https://www.tell.com.ng/wp-content/uploads/2019/08/facebook-1.png" alt="" width="22" height="22" /></a><a style="color: #000000;" href="https://twitter.com/telldotafrica"><img class="alignnone wp-image-28421" src="https://www.tell.com.ng/wp-content/uploads/2019/08/twitter-1.png" alt="" width="21" height="21" /></a><a style="color: #000000;" href="https://instagram.com/tell.africa"><img class="alignnone wp-image-28422" src="https://www.tell.com.ng/wp-content/uploads/2019/08/instagram-1.png" alt="" width="21" height="21" /></a> <a style="color: #000000;" href="https://linkedin.com/company/tellafrica"><img class="alignnone wp-image-28423" src="https://www.tell.com.ng/wp-content/uploads/2019/08/linkedin-1.png" alt="" width="21" height="21" /></a><a style="color: #000000;" href="https://youtu.be/4L3b6L3eL6g"><img class="alignnone wp-image-28424" src="https://www.tell.com.ng/wp-content/uploads/2019/08/youtube.png" alt="" width="21" height="21" /></a><a style="color: #000000;" href="https://api.whatsapp.com/send?phone=2348167299743"><img class="alignnone wp-image-28425" src="https://www.tell.com.ng/wp-content/uploads/2019/08/whatsapp-1.png" alt="" width="22" height="22" /></a></span></p>
  
  <div style="color: white; text-align: center;"><span style="color: #ffffff;"><a style="color: #ffffff;" href="https://tell.africa/about">About Us</a> <a style="color: #ffffff;" href="https://www.tell.africa/anonymous/">| Write Anonymously</a> <a style="color: #ffffff;" href="https://www.tell.africa/hire">| Find Writers</a><a style="color: #ffffff;" href="https://www.tell.africa/column/">| Create A Column.</a></span></div>
  <div></div>
  <div style="color: white; text-align: center;"><span style="color: #0f961f;">.</span></div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>`,
            });
          });
        });
    },

    giftBook() {
      this.giftPop = true;
    },

    addGift() {
      this.loading = true;
      db.collection("users")
        .doc(this.name)
        .get()
        .then((doc) => {
          if (doc.exists) {
            db.collection("users")
              .doc(this.name)
              .get()
              .then((doc) => {
                if (doc.data().books.includes(this.bookID)) {
                  this.error = `Sorry, ${this.name} already has this book in their library`;
                  this.snackbar = true;
                  this.loading = false;
                } else {
                  db.collection("users")
                    .doc(this.name)
                    .update({
                      books: firebase.firestore.FieldValue.arrayUnion(
                        this.bookID
                      ),
                    })
                    .catch((error) => {
                      this.error =
                        error.message;
                      this.snackbar = true;
                      this.loading = false;
                      // reject(error);
                    })

                    .then(() => {
                      db.collection("books")
                        .doc(this.$route.params.id)
                        .update({
                          readers: firebase.firestore.FieldValue.arrayUnion(
                            this.name
                          ),
                        })
                        .then(() => {
                          Vue.loadScript("https://smtpjs.com/v3/smtp.js").then(
                            () => {
                              db.collection("users")
                                .doc(this.name)
                                .get()
                                .then((gift) => {
                                  this.recipient = gift.data();
                                  // eslint-disable-next-line no-undef
                                  Email.send({
                                    SecureToken:
                                      "ac498295-32fa-4869-839c-42afcca0ca2b",
                                    To: `${this.recipient.email}`,
                                    From:
                                      "Teni from Tell! Books | books@tell.africa",
                                    Subject: `${this.user.displayName} just bought a book for you!`,
                                    Body: `<div style="color: #444444; font-weight: normal;">
  <div style="max-width: 560px; padding: 20px; background: #ffffff; border-radius: 5px; margin: 40px auto; font-family: Source Sans Pro,Source Sans Serif; font-size: 15px; color: #666;">
  <div style="color: #444444; font-weight: normal;">
  <div style="text-align: center; font-weight: 400; font-size: 15px; padding-top: 10px; padding-right: 0px; padding-bottom: 10px; border-bottom: 3px solid #eeeeee; margin-bottom: 1em;">
  <p style="color: #444444;"><img class="alignnone wp-image-27004" src="https://tell.africa/wp-content/uploads/2019/03/Webp.net-resizeimage-3.png" alt="" width="40" height="40" /></p>
  <p style="text-align: left;">1 min read |</p>
  
  <h2 style="color: #666666; text-align: left;"><span style="color: #000000;">Hi ${this.name}<strong>,</strong></span></h2>
  <p style="text-align: left;">${this.user.displayName} just bought the book, ${this.book.title} for you on Tell! Books.</p><br>
  <p style="text-align:left"> To read the book, click the button below to navigate to your gift tab:</p>
  
  <br>
  
  <p style="text-align:center"><span style="color: #000000;"><strong><span style="color: #ffffff;"><a style="background: #0f961f; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 3px; letter-spacing: 0.3px;" href="https://books.tell.africa/gifts">View Gifts</a></span></strong></span></p><br>
  
  
  
  <p style="text-align:left">If you need any support, kindly send us an email at <a href="mailto:books@tell.africa">books@tell.africa </a>or send us a message on WhatsApp by clicking the button below:</p> <br>
  
  <p style="text-align:center"><span style="color: #000000;"><strong><span style="color: #ffffff;"><a style="background: #0f961f; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 3px; letter-spacing: 0.3px;" href="https://api.whatsapp.com/send?phone=2348167299743&amp;text=Hi%20tellbooks.%20I%20need%20to%20talk%20to%20a%20customer%20support%20representative.%20My%20name%20is%20">WhatsApp Us</a></span></strong></span></p>
  
  &nbsp;
  <div style="color: #666666; font-weight: normal;"><span style="color: #ffffff;">.</span></div>
  <div style="color: #666666; text-align: left;"><span style="color: #000000;">Kind Regards 💚 , </span></div>
  <div style="color: #666666; text-align: left;"><span style="color: #000000;">Teniola</span></div>
  <div style="color: #666666; text-align: left; font-size:13px"><span style="font-size:11px; color: #000000;"><i>Customer Happiness Rep @ Tell! Books</i></span></div>
  <div style="color: #666666; font-weight: normal;"></div>
  <div style="font-weight: normal;"></div>
  <div style="color: #666666;">
  <div style="max-width: 560px; padding: 0px; background: #ffffff; border-radius: 5px; margin: 40px auto; font-family: Open Sans,Helvetica,Arial; font-size: 15px; color: #666;">
  <div style="border-bottom: 3px solid #eeeeee;">
  <div style="color: black; background:#0f961f;">
  <div style="background-color:#0f961f; color: black; text-align: center; padding: 30px 20px 90px 30px;">
  <p style="text-align: center; color: white;"><span style="color: #ffffff;"><strong>Follow us on Social Media:</strong></span></p>
  <p style="text-align: center; color: white;"><span style="color: #000000;"><a style="color: #000000;" href="https://facebook.com/tell.com.ng"><img class="alignnone wp-image-28420" src="https://www.tell.com.ng/wp-content/uploads/2019/08/facebook-1.png" alt="" width="22" height="22" /></a><a style="color: #000000;" href="https://twitter.com/telldotafrica"><img class="alignnone wp-image-28421" src="https://www.tell.com.ng/wp-content/uploads/2019/08/twitter-1.png" alt="" width="21" height="21" /></a><a style="color: #000000;" href="https://instagram.com/tell.africa"><img class="alignnone wp-image-28422" src="https://www.tell.com.ng/wp-content/uploads/2019/08/instagram-1.png" alt="" width="21" height="21" /></a><a style="color: #000000;" href="https://linkedin.com/company/tellafrica"><img class="alignnone wp-image-28423" src="https://www.tell.com.ng/wp-content/uploads/2019/08/linkedin-1.png" alt="" width="21" height="21" /></a><a style="color: #000000;" href="https://youtu.be/4L3b6L3eL6g"><img class="alignnone wp-image-28424" src="https://www.tell.com.ng/wp-content/uploads/2019/08/youtube.png" alt="" width="21" height="21" /></a><a style="color: #000000;" href="https://api.whatsapp.com/send?phone=2348167299743"><img class="alignnone wp-image-28425" src="https://www.tell.com.ng/wp-content/uploads/2019/08/whatsapp-1.png" alt="" width="22" height="22" /></a></span></p>
  
  <div style="color: white; text-align: center;"><span style="color: #ffffff;"><a style="color: #ffffff;" href="https://tell.africa/about">About Us</a> <a style="color: #ffffff;" href="https://www.tell.africa/anonymous/">| Write Anonymously</a> <a style="color: #ffffff;" href="https://www.tell.africa/hire">| Find Writers</a><a style="color: #ffffff;" href="https://www.tell.africa/column/">| Create A Column.</a></span></div>
  <div></div>
  <div style="color: white; text-align: center;"><span style="color: #0f961f;">.</span></div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>`,
                                  });
                                });
                            }
                          );
                        })

                        .then(() => {
                          this.giftPop = false;
                          this.giftcompleted = true;
                          this.loading = false;
                        });
                    });
                }
              });
          } else {
            this.error =
              "Sorry, the username you entered does not have a Tell! Books account";
            this.snackbar = true;
            this.loading = false;
          }
        });
    },

    submitted() {
      db.collection("reviews")
        .add({
          on: this.$route.params.id,
          review: this.newReview,
          from: this.user.displayName,
          photoURL: this.user.photoURL,
          rating: this.rating,
          timestamp: Date.now(),
        })
        .then(() => {
          this.newReview = null;
        })
        .then(() => {
          db.collection("books")
            .doc(this.$route.params.id)
            .update({
              rating: this.totalrating / this.reviews.length,
            });
        });
    },

    callback(response) {
      this.paystackRef = response.reference;
    },
    callbackFlutter(response) {
      this.flutterwaveRef = response.referenceFlutter;
    },
    callbackgift(response) {
      this.paystackgift = response.referencegift;
    },
    close: () => {
      console.log("You closed checkout page");
      this.error = "You closed checkout page";
      this.snackbar = true;
    },

    addToLibrary() {
      this.pointer = slugify(this.user.displayName, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true,
      });

      db.collection("books")
        .doc(this.$route.params.id)
        .update({
          readers: firebase.firestore.FieldValue.arrayUnion(this.user.uid),
        })
        .then(() => {
          db.collection("users")
            .doc(this.pointer)
            .update({
              books: firebase.firestore.FieldValue.arrayUnion(this.bookID),
            });
        })
        .then(() => {
          this.freeCompleted = true;
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scope>
ol {
  list-style-type: none;
}
</style>
