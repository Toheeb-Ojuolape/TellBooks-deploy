<template>
  <v-app>
    <v-row class="hidden-sm-and-down" no-gutters>
      <v-col
        class="hidden-sm-and-down"
        v-if="person != null"
        md="1"
        sm="1"
        lg="1"
      >
        <NavBar />
      </v-col>

      <v-spacer />
      <v-col :md="md" :lg="lg" :sm="sm">
        <div style="margin:10px 40px 0px 0px;padding:0px 10px 0px 100px">
          <v-toolbar flat>
            <v-btn text @click="goBack" color="#f66c1f">
              <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
            </v-btn>
            <v-toolbar-title
              class="mx-14 my-5"
              height="500px"
              style="font-size:17px"
            >
              {{ pageTitle }}
            </v-toolbar-title>

            <v-spacer />

            <v-btn fab text to="/shelf">
              <v-icon color="#f66c1f">mdi-magnify</v-icon>
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

          <v-container>
            <!-- Display Information about the book start -->
            <v-row>
              <v-card
                cols="12"
                lg="4"
                md="4"
                elevation="24"
                height="320px"
                width="210px"
                class="mt-7"
              >
                <v-img
                  :src="singleBook.bookcover"
                  height="320px"
                  width="210px"
                />
              </v-card>

              <v-col lg="8" md="8" class="ml-4">
                <v-skeleton-loader
                  type="heading,article,text"
                  v-if="loading"
                ></v-skeleton-loader>
                <div class="mt-3">
                  <h2
                    style="font-size:32px;margin-top:10px"
                    class="font-weight-bold"
                  >
                    {{ singleBook.title }}
                  </h2>

                  <router-link
                    style="text-decoration:none;margin-left:0px;font-size:16px;color:#f66c1f"
                    :to="`/author/${singleBook.author}`"
                  >
                    by {{ authorName }}
                  </router-link>
                  <p
                    style="font-size:14px;padding-top:7px"
                    v-if="singleBook.coauthor != null"
                  >
                    co-author(s): {{ singleBook.coauthor }}
                  </p>
                  <div style="font-size:13px;margin-top:7px;margin-left:5px">
                    <v-icon>mdi-book-open-page-variant</v-icon>
                    <p style="margin-left:7px">
                      {{ singleBook.readers.length }}
                    </p>
                  </div>
                  <v-spacer />
                  <div style="font-size:12px;margin-left:75px;margin-top:-58px">
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
                    v-if="singleBook.filetype == 'Epub'"
                    small
                    rounded
                    color="#f6b911"
                    class="white--text"
                  >
                    {{ singleBook.filetype }}
                  </v-btn>
                  <v-btn
                    v-else
                    small
                    rounded
                    color="#e00000"
                    class="white--text"
                  >
                    {{ singleBook.filetype }}
                  </v-btn>
                  <v-btn
                    :to="`/category/${singleBook.category}`"
                    v-if="singleBook.filetype == 'Epub'"
                    small
                    rounded
                    color="#f6b911"
                    class="white--text ml-2"
                  >
                    {{ singleBook.category }}
                  </v-btn>
                  <v-btn
                    :to="`/category/${singleBook.category}`"
                    v-else
                    small
                    rounded
                    color="#e00000"
                    class="white--text ml-2"
                  >
                    {{ singleBook.category }}
                  </v-btn>

                  <div
                    style="font-size:14px;margin-top:12px;margin-bottom:12px"
                  >
                    About:<br />
                    {{ singleBook.description }}
                  </div>

                  <v-btn
                    v-if="singleBook.price != 0 && person == null"
                    style="font-size:9px;margin-top:10px"
                    color="#f66c1f"
                    @click="signup = !signup"
                    class="my-5 white--text font-weight-bold body-2"
                  >
                    Buy for {{ singleBook.currency }} {{ singleBook.price }}
                  </v-btn>

                  <v-btn
                    v-if="yesUser"
                    style="font-size:9px;margin-top:10px"
                    color="#f66c1f"
                    @click="dialog = true"
                    class="my-5 white--text font-weight-bold body-2"
                  >
                    Buy for {{ singleBook.currency }} {{ singleBook.price }}
                  </v-btn>

                  <v-btn
                    v-if="paidUser"
                    style="font-size:9px;margin-top:10px"
                    color="#f66c1f"
                    :to="`/${singleBook.filetype}/${singleBook.slug}`"
                    class="my-5 white--text font-weight-bold body-2"
                  >
                    Read Now
                  </v-btn>

                  <v-btn
                    v-if="singleBook.price == 0 && person == null"
                    class="white---text font-weight-bold body-2"
                    style="font-size:16px;color:white"
                    color="#f66c1f"
                    @click="signup = !signup"
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
                    :to="`/${singleBook.filetype}/${singleBook.slug}`"
                    class="white--text font-weight-bold body-2"
                  >
                    Read Now
                  </v-btn>

                  <v-btn
                    v-if="singleBook.price != 0"
                    color="#f66c1f"
                    outlined
                    dark
                    @click="giftlog"
                    style="margin-left:15px"
                    ><v-icon class="mr-2">mdi-gift</v-icon> Gift this book
                  </v-btn>

                  <v-btn
                    small
                    fab
                    color="#008140"
                    v-if="
                      singleBook.price == 0 &&
                        person == null &&
                        singleBook.downloadable == 'Yes'
                    "
                    style="margin-left:5px"
                    @click="signup = !signup"
                  >
                    <v-icon color="white">mdi-cloud-download</v-icon>
                  </v-btn>

                  <v-btn
                    small
                    fab
                    color="#008140"
                    v-if="freeUser && singleBook.downloadable == 'Yes'"
                    style="margin-left:5px"
                    :href="book.book"
                  >
                    <v-icon color="white">mdi-cloud-download</v-icon>
                  </v-btn>

                  <v-btn
                    small
                    fab
                    color="#008140"
                    v-if="freepaidUser && singleBook.downloadable == 'Yes'"
                    style="margin-left:5px"
                    :href="book.book"
                  >
                    <v-icon color="white">mdi-cloud-download</v-icon>
                  </v-btn>

                  <v-card flat class="mt-3">
                    <v-btn
                      dark
                      fab
                      color="#1773ea"
                      x-small
                      :href="
                        `https://facebook.com/sharer/sharer.php?u=${pageUrl}`
                      "
                      target="_blank"
                      right
                      bottom
                      class="mr-2"
                    >
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn
                      dark
                      fab
                      color="green"
                      x-small
                      :href="
                        `https://wa.me/?text=Read%20${singleBook.title}%20by%20${singleBook.author}%20on%20tellbooks%20${pageUrl}`
                      "
                      target="_blank"
                      right
                      bottom
                      class="mr-2"
                    >
                      <v-icon>mdi-whatsapp</v-icon>
                    </v-btn>
                    <v-btn
                      dark
                      fab
                      color="#1da1f2"
                      x-small
                      :href="
                        `https://twitter.com/intent/tweet?text=Read%20${singleBook.title}%20by%20${singleBook.author}%20on%20tellsingleBooks&url=${pageUrl}`
                      "
                      target="_blank"
                      right
                      bottom
                      class="mr-2"
                    >
                      <v-icon>mdi-twitter</v-icon>
                    </v-btn>

                    <v-btn
                      dark
                      fab
                      color="#2663ac"
                      x-small
                      :href="
                        `https://www.linkedin.com/shareArticle?mini=true&title=Read%20${singleBook.title}%20by%20${singleBook.author}%20on%20tellbooks&url=${pageUrl}`
                      "
                      target="_blank"
                      right
                      bottom
                      class="mr-2"
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
                        color="#f66c1f"
                        style="margin-left:-80px"
                      >
                        <v-icon v-if="dialShare" class="white--text"
                          >mdi-close</v-icon
                        >
                        <v-icon v-else class="white--text"
                          >mdi-share-variant</v-icon
                        >
                      </v-btn>
                    </template>
                    <v-btn
                      dark
                      fab
                      fixed
                      bottom
                      color="#1773ea"
                      small
                      :href="
                        `https://facebook.com/sharer/sharer.php?u=${pageUrl}`
                      "
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
                        `https://wa.me/?text=Read%20${singleBook.title}%20by%20${singleBook.author}%20on%20tellsingleBooks%20${pageUrl}`
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
                        `https://twitter.com/intent/tweet?text=Read%20${singleBook.title}%20by%20${singleBook.author}%20on%20tellbooks&url=${pageUrl}`
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
                        `https://www.linkedin.com/shareArticle?mini=true&title=Read%20${singleBook.title}%20by%20${singleBook.author}%20on%20tellbooks&url=${pageUrl}`
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
                </div>
              </v-col>
            </v-row>
          </v-container>
          <!-- Commenting and related books for laptop -->
          <v-container>
            <p
              v-if="person == null"
              style="font-size:18px;text-align:center;padding-top:55px"
              class="font-weight-light"
            >
              Please
              <v-btn text @click="login = !login" style="color:#f66c1f"
                >login</v-btn
              >
              or
              <v-btn text @click="signup = !signup" style="color:#f66c1f"
                >create an account</v-btn
              >
              to leave a review
            </p>
            <p
              v-if="person != null"
              style="font-size:18px;padding-top:55px;margin-bottom:0px;padding-left:10px"
              class="font-weight-light"
            >
              Leave a review
            </p>
            <hr v-if="person != null" style="margin-left:10px" width="80px" />

            <v-card flat class="px-40" width="83%">
              <v-form
                v-if="person != null"
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
                <v-btn
                  @click="submitted"
                  :disabled="rating == 0"
                  color="#f66c1f"
                  class="white--text"
                >
                  Submit Review
                </v-btn>
              </v-form>
            </v-card>
            <v-card
              flat
              width="85%"
              class="my-7 mr-13"
              style="margin-left:-17px"
            >
              <ol>
                <li
                  style="text-decoration:none"
                  v-for="(review, index) in filteredReviews"
                  :key="index"
                >
                  <v-card flat class="pa-4 mt-4">
                    <div style="font-size:16px">
                      <v-avatar
                        width="40px"
                        height="40px"
                        style="padding-left:-30px;margin:5px"
                      >
                        <img :src="review.photoURL"
                      /></v-avatar>
                      <span v-if="review.from.length > 15"
                        >{{ String(review.from).slice(0, 15) }}...</span
                      >
                      <span v-else>{{ review.from }}</span>

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
                  <v-divider></v-divider>
                </li>
              </ol>
            </v-card>
            <v-btn
              @click="loadComments()"
              outlined
              width="76%"
              height="50px"
              color="#f66c1f"
              tile
              class="pa-4 ml-3 mt-4 mb-6 text-center"
              v-if="reviews.length > loadMore"
              >Load More Comments</v-btn
            >
            <!-- End of how comments appear on the page -->
            <!-- End of book page appearance -->

            <!-- Related books -->
            <p
              v-if="related.length != 0"
              class="headline font-weight-bold hidden-md-and-down ml-2"
            >
              Related Books
            </p>
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

            <p
              v-if="related.length != 0"
              class="font-weight-bold hidden-lg-and-up"
              style="font-size:18px;margin-bottom:-10px;padding-left:10px"
            >
              Related Books
            </p>

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
              style="margin-left:-20px;margin-bottom:60px"
            >
              <v-slide-item
                v-for="(b, i) in related"
                :key="i"
                v-slot:default="{ active, toggle }"
              >
                <v-card
                  :color="active ? undefined : 'white'"
                  class="ma-4"
                  height="190"
                  width="120"
                  elevation="7"
                  style="margin-bottom:10px"
                  @click="toggle"
                >
                  <v-img
                    elevation="24"
                    hover
                    width="120px"
                    height="190px"
                    :src="b.bookcover"
                    @click="bookPage(i, b)"
                  />
                  <v-rating
                    color="#f5a623"
                    size="9"
                    readonly
                    :value="parseFloat(b.rating)"
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
          </v-container>

          <!-- End of commenting and related books for laptop -->
        </div>
      </v-col>
    </v-row>
    <!-- Mobile view -->
    <v-main
      style="background:#fbe4c4;text-align:center;margin-top:-20px"
      class="hidden-md-and-up"
    >
      <div style="margin-top:30px;padding:10px">
        <v-btn
          @click="goBack"
          class="mt-1"
          style="float:left;color:#f66c1f"
          text
        >
          <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>

        <v-spacer />
        <div style="float:right">
          <v-btn
            class="mt-2"
            style="font-size:15px"
            color="#f66c1f"
            to="/shelf"
            icon
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn
            rounded
            elevation="24"
            to="/publish"
            color="white"
            class="mt-2"
            style="font-size:15px;color:#f66c1f"
          >
            <v-icon class="mr-1" color="#f66c1f">mdi-plus-circle-outline</v-icon
            >Publish
          </v-btn>
        </div>
      </div>

      <v-card
        elevation="24"
        height="315px"
        width="195px"
        style="max-width:195px;margin:20% auto 20% auto"
      >
        <v-img :src="singleBook.bookcover" height="100%" width="100%" />
      </v-card>
      <v-card flat style="padding-top:20px;border-radius:30px 30px 0 0">
        <v-skeleton-loader
          type="heading,article,text,text,article"
          v-if="loading"
        ></v-skeleton-loader>
        <div>
          <h2
            style="font-size:20px;margin-top:10px;max-width:80%;margin:10px auto 5px auto"
            class="font-weight-bold"
          >
            {{ singleBook.title }}
          </h2>

          <router-link
            style="text-decoration:none;font-size:16px;color:#f66c1f;margin-left:0px"
            :to="`/author/${singleBook.author}`"
          >
            by {{ authorName }}
          </router-link>
          <p
            style="font-size:13px;padding-top:7px"
            v-if="singleBook.coauthor != null"
          >
            co-author(s):<br />
            {{ singleBook.coauthor }}
          </p>
          <v-rating
            small
            color="#f5a623"
            readonly
            class="mb-2"
            :value="parseFloat(singleBook.rating)"
          />
          <v-card flat>
            <v-row justify="center" no-gutters>
              <div style="float:left">
                <p style="margin-top:0px;padding-top:0px;font-size:10px">
                  <v-icon small>mdi-book-open-page-variant</v-icon>
                  {{ singleBook.readers.length }}
                </p>
              </div>
              <div style="float:left;margin-left:5%">
                <p style="margin-top:0px;padding-top:0px;font-size:10px">
                  <v-icon small>mdi-comment-text-multiple-outline</v-icon>
                  {{ reviews.length }}
                </p>
              </div>
              <div style="float:left;margin-left:5%">
                <p
                  v-if="singleBook.rating == ''"
                  style="margin-top:0px;padding-top:0px;font-size:10px"
                >
                  <v-icon small color="#f5a623">mdi-star</v-icon>
                  0/5
                </p>
                <p v-else style="margin-top:0px;padding-top:0px;font-size:10px">
                  <v-icon small color="#f5a623">mdi-star</v-icon>
                  {{ parseInt(singleBook.rating) }}/5
                </p>
              </div>
            </v-row>
          </v-card>
          <div style="margin-top:10px;margin-bottom:15px">
            <v-btn
              v-if="singleBook.filetype == 'Epub'"
              x-small
              rounded
              color="#f6b911"
              class="white--text mr-2"
            >
              {{ singleBook.filetype }}
            </v-btn>
            <v-btn
              v-else
              x-small
              rounded
              color="#e00000"
              class="white--text mr-2"
            >
              {{ singleBook.filetype }}
            </v-btn>
            <v-btn
              :to="`/category/${singleBook.category}`"
              v-if="singleBook.filetype == 'Epub'"
              x-small
              rounded
              color="#f6b911"
              class="white--text mr-3"
            >
              {{ singleBook.category }}
            </v-btn>
            <v-btn
              v-else
              :to="`/category/${singleBook.category}`"
              x-small
              rounded
              color="#e00000"
              class="white--text"
            >
              {{ singleBook.category }}
            </v-btn>
          </div>
          <div>
            <v-btn
              dark
              fab
              color="#1773ea"
              x-small
              :href="`https://facebook.com/sharer/sharer.php?u=${pageUrl}`"
              target="_blank"
              right
              bottom
              style="margin-right:10px"
            >
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn
              dark
              fab
              style="margin-right:10px"
              color="green"
              x-small
              :href="
                `https://wa.me/?text=Read%20${singleBook.title}%20by%20${singleBook.author}%20on%20tellbooks%20${pageUrl}`
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
              style="margin-right:10px"
              color="#1da1f2"
              x-small
              :href="
                `https://twitter.com/intent/tweet?text=Read%20${singleBook.title}%20by%20${singleBook.author}%20on%20tellbooks&url=${pageUrl}`
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
              style="margin-right:10px"
              color="#2663ac"
              x-small
              :href="
                `https://www.linkedin.com/shareArticle?mini=true&title=Read%20${singleBook.title}%20by%20${singleBook.author}%20on%20tellbooks&url=${pageUrl}`
              "
              target="_blank"
              right
              bottom
            >
              <v-icon>mdi-linkedin</v-icon>
            </v-btn>
          </div>

          <div
            class="hidden-lg-and-up"
            style="text-align:left;padding:9px;font-size:14px;margin-top:12px;max-width:85%;margin:12px auto auto auto "
          >
            {{ singleBook.description }}
          </div>
        </div>

        <!-- Commenting and related books start -->
        <v-container style="text-align:start">
          <p
            v-if="user.data == null"
            style="font-size:18px;text-align:center;padding-top:55px"
            class="font-weight-light"
          >
            Please
            <v-btn text @click="login = !login" style="color:#f66c1f"
              >login</v-btn
            >
            or
            <v-btn text @click="signup = !signup" style="color:#f66c1f"
              >create an account</v-btn
            >
            to leave a review
          </p>
          <p
            v-if="person != null"
            style="font-size:18px;padding-top:55px;margin-bottom:0px;padding-left:10px"
            class="font-weight-light"
          >
            Leave a review
          </p>
          <hr v-if="person != null" style="margin-left:10px;" width="80px" />

          <v-card flat class="px-40" width="83%">
            <v-form
              v-if="person != null"
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
              <v-btn
                @click="submitted"
                :disabled="rating == 0"
                color="#f66c1f"
                class="white--text"
              >
                Submit Review
              </v-btn>
            </v-form>
          </v-card>
          <v-card flat width="85%" class="my-7 mr-13" style="margin-left:-17px">
            <ol>
              <li
                style="text-decoration:none"
                v-for="(review, index) in filteredReviews"
                :key="index"
              >
                <v-card class="pa-4 mt-4">
                  <div style="font-size:16px">
                    <v-avatar
                      width="40px"
                      height="40px"
                      style="padding-left:-30px;margin:5px"
                    >
                      <img :src="review.photoURL"
                    /></v-avatar>
                    <span v-if="review.from.length > 15"
                      >{{ String(review.from).slice(0, 15) }}...</span
                    >
                    <span v-else>{{ review.from }}</span>

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
          <v-btn
            @click="loadComments()"
            outlined
            width="76%"
            height="50px"
            color="#f66c1f"
            tile
            class="pa-4 ml-3 mt-4 mb-6 text-center"
            v-if="reviews.length > loadMore"
            >Load More Comments</v-btn
          >
          <!-- End of how comments appear on the page -->
          <!-- End of book page appearance -->

          <!-- Related books -->
          <p
            v-if="related.length != 0"
            class="headline font-weight-bold hidden-md-and-down ml-2"
          >
            Related Books
          </p>
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

          <p
            v-if="related.length != 0"
            class="font-weight-bold hidden-lg-and-up"
            style="font-size:18px;margin-bottom:-10px;padding-left:10px"
          >
            Related Books
          </p>

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
            style="margin-left:-20px;margin-bottom:60px"
          >
            <v-slide-item
              v-for="(b, i) in related"
              :key="i"
              v-slot:default="{ active, toggle }"
            >
              <v-card
                :color="active ? undefined : 'white'"
                class="ma-4"
                height="190"
                width="120"
                elevation="7"
                style="margin-bottom:10px"
                @click="toggle"
              >
                <v-img
                  elevation="24"
                  hover
                  width="120px"
                  height="190px"
                  :src="b.bookcover"
                  @click="bookPage(i, b)"
                />
                <v-rating
                  color="#f5a623"
                  size="9"
                  readonly
                  :value="parseFloat(b.rating)"
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
        </v-container>
        <!-- End of commenting and related books -->
        <!-- Display Information about the book ends here -->

        <!-- Start of sharing buttons -->

        <!-- End of sharing button -->

        <!-- This handles gifting -->

        <!-- End of gifting feature -->
      </v-card>
    </v-main>

    <!-- This handles how comments appear on the page -->

    <!-- Related books -->

    <!-- This is where all the dialog popup boxes will appear -->
    <!-- Payment Popup for buying books -->

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card v-if="user.data != null">
        <p
          class="font-weight-bold text-center"
          style="padding-top:22px;font-size:19px"
        >
          Choose Payment Option:
        </p>

        <v-card-actions class="justify-center">
          <flutterwave
            :is-production="isProduction"
            :name="user.data.displayName"
            :email="user.data.email"
            :amount="singleBook.price"
            :reference="referenceFlutter"
            flw-key="FLWPUBK-f92a354d64f5b330062fe7928f4321f6-X"
            :callback="callbackFlutter"
            :close="close"
            :currency="singleBook.currency"
            :country="country"
            :payment_method="paymentMethod"
          />
        </v-card-actions>

        <v-card-actions
          v-if="singleBook.currency == 'NGN'"
          class="justify-center"
        >
          <paystack
            :amount="singleBook.price * 100"
            :email="user.data.email"
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
              `https://api.whatsapp.com/send?phone=2348167299743&text=Hi%20tellbooks.%20I%20would%20like%20to%20buy%20${singleBook.title}%20by%20${singleBook.author}%20for%20${singleBook.currency}${singleBook.price}.%20My%20name%20is%20${user.data.displayName}`
            "
          >
            <v-icon class="white--text ma-2">mdi-whatsapp</v-icon>Pay with
            WhatsApp
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
        <p
          class="font-weight-bold white--text text-center mt-2 px-5"
          style="font-size:22px"
        >
          {{ singleBook.title }} has been added to your library!
        </p>

        <p class="text-center white--text">
          Click the button below to start reading
        </p>
        <v-card-text style="text-align:center">
          <v-spacer></v-spacer>

          <v-btn
            color="white"
            :to="`/${singleBook.filetype}/${singleBook.slug}`"
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
          >{{ singleBook.title }} has been added to your library!</v-card-text
        >

        <v-card-text class="text-center white--text">
          Click the button below to start reading
        </v-card-text>
        <v-card-text style="text-align:center">
          <v-spacer></v-spacer>

          <v-btn
            color="white"
            :to="`/${singleBook.filetype}/${singleBook.slug}`"
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
    <v-dialog v-model="giftdialog" max-width="510" persistent max-height="500">
      <v-card class="pa-6 text-center" v-if="user.data != null">
        <p class="font-weight-bold" style="font-size:17px">
          Choose Payment Option:
        </p>
        <p style="font-size:14px">Buy {{ singleBook.title }} for a friend.</p>
        <v-card-actions
          v-if="singleBook.currency == 'NGN'"
          class="justify-center"
        >
          <paystack
            :amount="singleBook.price * 100"
            :email="user.data.email"
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
              `https://api.whatsapp.com/send?phone=2348167299743&text=Hi%20tellbooks.%20I%20would%20like%20to%20gift%20${singleBook.title}%20by%20${singleBook.author}%20for%20${singleBook.currency}${singleBook.price}.%20My%20name%20is%20${user.data.displayName}`
            "
          >
            <v-icon class="white--text ma-2">mdi-whatsapp</v-icon>Pay with
            WhatsApp
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
        <v-card-text
          class="font-weight-bold white--text text-center mt-2"
          style="font-size:23px"
          >Payment Successful!</v-card-text
        >

        <v-card-text class="text-center white--text">
          Kindly enter the Tell! Books username (in lowercase) of the person you
          bought the book for
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
            class="mb-3 px-3 mx-5"
            style="color:#f66c1f"
            :loading="btnLoading"
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
        <v-card-text
          class="font-weight-bold white--text text-center mt-2"
          style="font-size:23px"
          >Gift delivered Successfully!
        </v-card-text>

        <v-card-text class="text-center white--text">
          {{ singleBook.title }} has been added to your beneficiary's gift tab
          in their dashboard. Tell them to login and check it out!
        </v-card-text>
        <v-card-actions style="text-align:center">
          <v-spacer></v-spacer>

          <v-btn
            color="white"
            @click="giftcompleted = false"
            style="#f66c1f"
            class="mb-3"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of entire gifting process -->
    <v-dialog v-model="snackbar" max-width="370" max-height="500">
      <v-card color="red" class="text-center pa-5">
        <v-icon color="white" size="100px">mdi-close-circle</v-icon>
        <v-card-text>
          <p
            style="padding-top:20px;font-size:16px;text-align:center;color:white"
          >
            {{ error }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="snackbar = false" style="font-size:12px">
            Try again
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog persistent max-width="400px" v-model="signup">
      <div style="padding:0px 16px 0px 0px" class="d-flex justify-end">
        <v-btn
          fab
          depressed
          style="margin-left:85%;text-align:end;margin-bottom:10px"
          small
          right
          color="white"
          @click="signup = !signup"
          ><v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <Signup @loginPop="loginPop" />
    </v-dialog>

    <v-dialog persistent max-width="400px" v-model="login">
      <div style="padding:0px 16px 0px 0px" class="d-flex justify-end">
        <v-btn
          fab
          depressed
          style="margin-left:85%;text-align:end;margin-bottom:10px"
          small
          right
          color="white"
          @click="login = !login"
          ><v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <Login @signupPop="signupPop" />
    </v-dialog>
    <!-- Bottom NavBar -->

    <div class="navbar hidden-md-and-up">
      <v-btn
        v-if="singleBook.price != 0 && person == null"
        style="font-size:9px;margin-bottom:20px; color:white"
        width="65%"
        color="#f66c1f"
        @click="signup = !signup"
        class="my-5 white--text font-weight-bold body-2"
      >
        Buy for {{ singleBook.currency }} {{ singleBook.price }}
      </v-btn>

      <v-btn
        v-if="yesUser"
        style="font-size:9px;margin-bottom:20px; color:white"
        color="#f66c1f"
        width="65%"
        @click="dialog = true"
        class="my-5 white--text font-weight-bold body-2"
      >
        Buy for {{ singleBook.currency }} {{ singleBook.price }}
      </v-btn>

      <v-btn
        v-if="paidUser"
        style="font-size:9px;margin-top:10px;width:80%"
        color="#f66c1f"
        :to="`/${singleBook.filetype}/${singleBook.slug}`"
        class="my-5 white--text font-weight-bold body-2"
      >
        Read Now
      </v-btn>

      <v-btn
        v-if="singleBook.price == 0 && person == null"
        style="font-size:9px;margin-top:10px;width:80%"
        class="my-5 white--text font-weight-bold body-2"
        color="#f66c1f"
        @click="signup = !signup"
      >
        Add To Library
      </v-btn>

      <v-btn
        v-if="freeUser"
        class="my-5 white--text font-weight-bold body-2"
        style="font-size:9px;margin-top:10px;width:80%"
        color="#f66c1f"
        @click="addToLibrary"
      >
        Add To Library
      </v-btn>

      <v-btn
        v-if="freepaidUser"
        style="font-size:9px; color:white"
        color="#f66c1f"
        width="80%"
        :to="`/${singleBook.filetype}/${singleBook.slug}`"
        class="my-5 white--text font-weight-bold body-2"
      >
        Read Now
      </v-btn>
      <v-btn
        v-if="singleBook.price != 0"
        color="#f66c1f"
        outlined
        dark
        tile
        @click="giftlog"
        style="margin-top:10px;margin-bottom:14px;margin-left:4px;"
        ><v-icon>mdi-gift</v-icon>
      </v-btn>
      <v-btn
        small
        fab
        color="#008140"
        v-if="
          singleBook.price != 0 &&
            person == null &&
            singleBook.downloadable == 'Yes'
        "
        style="margin-left:5px"
        @click="signup = !signup"
      >
        <v-icon color="white">mdi-cloud-download</v-icon>
      </v-btn>

      <v-btn
        small
        fab
        color="#008140"
        v-if="freeUser && singleBook.downloadable == 'Yes'"
        style="margin-left:5px"
        :href="singleBook.book"
      >
        <v-icon color="white">mdi-cloud-download</v-icon>
      </v-btn>

      <v-btn
        small
        fab
        color="#008140"
        v-if="freepaidUser && singleBook.downloadable == 'Yes'"
        style="margin-left:5px"
        :href="singleBook.book"
      >
        <v-icon color="white">mdi-cloud-download</v-icon>
      </v-btn>
    </div>
  </v-app>
</template>

<script>
import "firebase/auth";
import Vue from "vue";
// eslint-disable-next-line no-unused-vars
import Loadscript from "vue-plugin-load-script";
import firebase from "firebase/app";
import "firebase/firestore";
import paystack from "vue-paystack";
import Flutterwave from "@/components/FlutterwaveModal.vue";
import db from "../main";
import slugify from "slugify";
import NavBar from "@/components/NavBar";
import moment from "moment";
import { mapGetters } from "vuex";
import { unslugify } from "unslugify";
import Signup from "@/components/Signup";
import Login from "@/components/Login";

export default {
  components: {
    paystack,
    Flutterwave,
    NavBar,
    Signup,
    Login,
  },
  data() {
    return {
      sm: 12,
      lg: 12,
      md: 12,
      signup: false,
      login: false,
      btnLoading: false,
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
      token: null,
      charge: null,
      rating: 0,
      totalrating: 0,
      freeCompleted: false,
      completed: false,
      snackbar: false,
      error: "",
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
      loadMore: 5,
      miniVariant: "",
      person: "",
    };
  },
  computed: {
    ...mapGetters({
      books: "books",
      user: "user",
      loading: "loading",
    }),

    pageTitle() {
      return unslugify(this.$route.params.id);
    },

    filteredReviews() {
      return this.reviews.slice(0, this.loadMore);
    },
    singleBook() {
      return this.books.filter((book) => book.slug == this.bookName)[0];
    },

    authorName() {
      return unslugify(this.singleBook.author);
    },

    related() {
      return this.books
        .filter((book) => book.category == this.singleBook.category)
        .filter((book) => book.slug != this.bookName)
        .slice(0, 5);
    },

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

  //fetching the  book's details
  created() {
    window.scrollTo(0, 0);
    this.$store.dispatch("bindBooks");
    firebase.auth().onAuthStateChanged((user) => {
      this.person = user;
      if (this.person != null) {
        this.sm = 10;
        this.md = 10;
        this.lg = 10;
      }
      if (this.singleBook.price != 0 && this.person == null) {
        this.notUser = true;
      }
      if (
        this.singleBook.price != 0 &&
        this.person != null &&
        !this.singleBook.readers.includes(this.person.uid)
      ) {
        this.yesUser = true;
      }
      if (
        this.singleBook.price != 0 &&
        this.person != null &&
        this.singleBook.readers.includes(this.person.uid)
      ) {
        this.paidUser = true;
      }
      if (this.singleBook.price == 0 && this.person == null) {
        this.notfreeUser = true;
      }
      if (
        this.singleBook.price == 0 &&
        this.person != null &&
        !this.singleBook.readers.includes(this.person.uid)
      ) {
        this.freeUser = true;
      }
      if (
        this.singleBook.price == 0 &&
        this.person != null &&
        this.singleBook.readers.includes(this.person.uid)
      ) {
        this.freepaidUser = true;
      }
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
      title: `Read ${this.singleBook.title} by ${this.singleBook.author}`,
      titleTemplate: " Tell! Books | %s",
      meta: [
        {
          name: "description",
          content:
            "Read more books by" +
            this.singleBook.author +
            " on Tell! Books | Top Online African Book publishing platform",
        },
        {
          property: "og:title",
          content: this.singleBook.title + " | Tell! Books",
        },
        { property: "og:site_name", content: "Tell! Books" },
        {
          property: "og:description",
          content:
            "Read more books by" +
            this.singleBook.title +
            " on Tell! Books | African Book publishing platform ",
        },
        { property: "og:type", content: "profile" },
        {
          property: "og:url",
          content: "https://books.tell.africa/" + this.singleBook.title,
        },
        { property: "og:image", content: this.singleBook.bookcover },
      ],
    };
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.sm = 10;
        this.md = 10;
        this.lg = 10;
      }
    });
  },
  //Leaving a comment
  methods: {
    closeSignup() {
      this.signup = false;
    },
    loginPop() {
      this.login = true;
      this.signup = false;
    },
    signupPop() {
      this.signup = true;
      this.login = false;
    },
    loadComments() {
      this.loadMore += 5;
    },

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
      if (this.user.data != null) {
        this.giftdialog = true;
      } else if (this.user.data == null) {
        this.signup = true;
      }
    },

    bookPage(i, b) {
      this.bookID = this.IDs[i];
      if (b.filetype == "Audio") {
        this.$router.push({
          name: "Audio",
          params: { id: b.slug, book: b, bookID: this.bookID },
        });
      } else if (b.filetype == "Chatbooks") {
        this.$router.push({
          name: "Chat",
          params: { id: b.slug, book: b, bookID: this.bookID },
        });
      } else {
        this.$router.push({
          name: "Books",
          params: { id: b.slug, book: b, bookID: this.bookID },
        });
      }
    },

    changesInDatabase() {
      this.pointer = slugify(this.user.data.displayName, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true,
      });

      db.collection("books")
        .doc(this.$route.params.id)
        .update({
          readers: firebase.firestore.FieldValue.arrayUnion(this.user.data.uid),
        })
        .then(() => {
          db.collection("users")
            .doc(this.pointer)
            .update({
              books: firebase.firestore.FieldValue.arrayUnion(this.bookName),
            });
        })
        .then(() => {
          this.completed = true;
          this.dialog = false;
          this.btnLoading = false;
        })
        .then(() => {
          Vue.loadScript("https://smtpjs.com/v3/smtp.js").then(() => {
            // eslint-disable-next-line no-undef
            Email.send({
              SecureToken: "ac498295-32fa-4869-839c-42afcca0ca2b",
              To: `${this.singleBook.email}`,
              From: "Teniola from Tell! Books | books@tell.africa",
              Subject: `${this.user.data.displayName} just bought your book, ${this.singleBook.title}`,
              Body: `<div style="color: #444444; font-weight: normal;">
  <div style="max-width: 560px; padding: 20px; background: #ffffff; border-radius: 5px; margin: 40px auto; font-family: Source Sans Pro,Source Sans Serif; font-size: 15px; color: #666;">
  <div style="color: #444444; font-weight: normal;">
  <div style="text-align: center; font-weight: 400; font-size: 15px; padding-top: 10px; padding-right: 0px; padding-bottom: 10px; border-bottom: 3px solid #eeeeee; margin-bottom: 1em;">
  <p style="color: #444444;"><img class="alignnone wp-image-27004" src="https://tell.africa/wp-content/uploads/2019/03/Webp.net-resizeimage-3.png" alt="" width="40" height="40" /></p>
  <p style="text-align: left;">1 min read |</p>
  
  <h2 style="color: #666666; text-align: left;"><span style="color: #000000;">Hi ${this.singleBook.author}<strong>,</strong></span></h2>
  <p style="text-align: left;">${this.user.data.displayName} just bought your book, ${this.singleBook.title} ,on Tell! Books.</p><br>
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
      this.btnLoading = true;
      db.collection("users")
        .doc(this.name)
        .get()
        .then((doc) => {
          if (doc.exists) {
            db.collection("users")
              .doc(this.name)
              .get()
              .then((doc) => {
                console.log(this.bookName);
                if (doc.data().books.includes(this.bookName)) {
                  this.error = `Sorry, ${this.name} already has this book in their library`;
                  this.snackbar = true;
                  this.btnLoading = false;
                } else {
                  db.collection("users")
                    .doc(this.name)
                    .update({
                      books: firebase.firestore.FieldValue.arrayUnion(
                        this.bookName
                      ),
                    })
                    .catch((error) => {
                      this.error = error.message;
                      this.snackbar = true;
                      this.btnLoading = false;
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
                                    Subject: `${this.user.data.displayName} just bought a book for you!`,
                                    Body: `<div style="color: #444444; font-weight: normal;">
  <div style="max-width: 560px; padding: 20px; background: #ffffff; border-radius: 5px; margin: 40px auto; font-family: Source Sans Pro,Source Sans Serif; font-size: 15px; color: #666;">
  <div style="color: #444444; font-weight: normal;">
  <div style="text-align: center; font-weight: 400; font-size: 15px; padding-top: 10px; padding-right: 0px; padding-bottom: 10px; border-bottom: 3px solid #eeeeee; margin-bottom: 1em;">
  <p style="color: #444444;"><img class="alignnone wp-image-27004" src="https://tell.africa/wp-content/uploads/2019/03/Webp.net-resizeimage-3.png" alt="" width="40" height="40" /></p>
  <p style="text-align: left;">1 min read |</p>
  
  <h2 style="color: #666666; text-align: left;"><span style="color: #000000;">Hi ${this.name}<strong>,</strong></span></h2>
  <p style="text-align: left;">${this.user.data.displayName} just bought the book, ${this.singleBook.title} for you on Tell! Books.</p><br>
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
                          this.btnLoading = false;
                        });
                    });
                }
              });
          } else {
            this.error =
              "Sorry, the username you entered does not have a Tell! Books account";
            this.snackbar = true;
            this.btnLoading = false;
          }
        });
    },

    submitted() {
      db.collection("reviews")
        .add({
          on: this.$route.params.id,
          review: this.newReview,
          from: this.user.data.displayName,
          photoURL: this.user.data.photoURL,
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
      this.pointer = slugify(this.user.data.displayName, {
        replacement: "-",
        remove: /[$*_+~.()'"!:@]/g,
        lower: true,
      });

      db.collection("books")
        .doc(this.$route.params.id)
        .update({
          readers: firebase.firestore.FieldValue.arrayUnion(this.user.data.uid),
        })
        .then(() => {
          db.collection("user")
            .doc(this.pointer)
            .update({
              books: firebase.firestore.FieldValue.arrayUnion(this.bookName),
            });
        })
        .then(() => {
          this.freeCompleted = true;
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    buttonfreeCompleted() {
      this.step++;
      this.freeCompleted = false;
      this.completed = false;
    },
  },
};
</script>

<style scope>
ol {
  list-style-type: none;
}

.hover:hover {
  background: #f66c1f;
  color: white;
}

.v-btn {
  text-transform: none !important;
}

body {
  margin: 0;
}

.navbar {
  overflow: hidden;
  background-color: white;
  position: fixed;
  text-align: center;
  bottom: 0;
  width: 100%;
}

.main {
  padding: 16px;
  margin-bottom: 30px;
}
</style>
