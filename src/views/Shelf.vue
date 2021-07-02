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
      <v-col :md="md" :sm="sm" :lg="lg">
        <div style="margin:10px 40px 0px 0px;padding:0px 10px 0px 100px">
          <v-card flat>
            <v-toolbar flat class="md-4 hidden-sm-and-down">
              <v-btn @click="goBack" text color="#f66c1f" width="10px">
                <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
              </v-btn>
              <v-toolbar-title
                class="mx-14 my-5 font-weight-bold"
                height="500px"
                style="font-size:22px"
              >
                Bookshelf
              </v-toolbar-title>

              <v-spacer />

              <v-btn
                rounded
                elevation="24"
                to="/publish"
                color="#f66c1f"
                class="white--text"
                style="font-size:15px;"
              >
                <v-icon class="mr-1">mdi-plus-circle-outline</v-icon> Publish
                Book
              </v-btn>
            </v-toolbar>
          </v-card>
          <v-card
            width="1500px"
            height="300px"
            class="orangeGradient mt-9 text-center"
            flat
          >
            <!-- <v-img
          style="padding-top:40px"
          width="1500px"
          height="350px"
          src="https://res.cloudinary.com/tell/image/upload/v1602797965/tellbooks_bookshelf_zkoutd.png"
        > -->
            <v-form @submit.prevent="find()">
              <v-text-field
                v-model="search"
                elevation="24"
                color="#f66c1f"
                label="Search by book title, author or category"
                solo
                prepend-inner-icon="mdi-magnify"
                style="border-radius:12px;padding-top:150px;padding-left:70px;padding:100px"
              />
            </v-form>
          </v-card>

          <v-slide-group
            v-model="model"
            class="pa-4 mt-4"
            active-class="success"
            show-arrows
            flat
          >
            <v-slide-item
              v-for="(category, i) in categories"
              :key="i"
              v-slot:default="{ active, toggle }"
              flat
            >
              <v-btn
                :color="color[i]"
                class="ma-3 white--text"
                width="120px"
                rounded
                @click="toggle"
                :to="category.link"
              >
                {{ category.category }}
                <v-row class="fill-height" align="center" justify="center" flat>
                  <v-scale-transition>
                    <v-icon
                      v-if="active"
                      color="white"
                      size="48"
                      flat
                      v-text="'mdi-close-circle-outline'"
                    ></v-icon>
                  </v-scale-transition>
                </v-row>
              </v-btn>
            </v-slide-item>
          </v-slide-group>

          <p
            style="padding-top:40px;margin-bottom:-20px;padding-left:10px;font-size:21px"
            class="font-weight-bold"
          >
            Top rated Books
          </p>
          <v-spacer />

          <v-row v-if="loading">
            <v-col v-for="n in 3" :key="n">
              <v-skeleton-loader
                class="mb-6 mt-6"
                type="card"
              ></v-skeleton-loader>
            </v-col>
          </v-row>

          <v-slide-group
            v-model="model"
            class="pa-2 mt-2"
            active-class="success"
            show-arro
            style="margin-left:-20px"
          >
            <v-slide-item
              v-for="(book, i) in filteredTop"
              :key="i"
              v-slot:default="{ active, toggle }"
            >
              <v-card
                :color="active ? undefined : 'white'"
                class="ma-4"
                height="390"
                width="230"
                flat
                @click="toggle"
              >
                <v-skeleton-loader
                  v-if="loading"
                  type="card"
                  width="100%"
                  elevation="1"
                  height="320px"
                >
                </v-skeleton-loader>

                <v-card elevation="10" width="100%" height="320px">
                  <v-img
                    elevation="24"
                    hover
                    width="100%"
                    height="320px"
                    :src="book.bookcover"
                    @click="bookPage(i, book)"
                  />
                </v-card>
                <p
                  v-if="book.title.length > 18"
                  style="color:black;margin-bottom:0px;padding:10px 10px 0px 10px"
                >
                  {{ String(book.title).slice(0, 18) }}...
                </p>
                <p v-else style="color:black;margin-bottom:0px;padding:10px 10px 0px 10px">
                  {{ book.title }}
                </p>
                <v-rating
                  color="#f5a623"
                  size="9"
                  readonly
                  :value="parseFloat(book.rating)"
                  style="margin-bottom:10px;margin-left:5px"
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

          <p
            style="padding-top:40px;margin-bottom:7px;padding-left:10px;font-size:21px"
            class="font-weight-bold"
          >
            Bestsellers
          </p>

          <v-spacer />

          <v-row v-if="loading">
            <v-col v-for="n in 3" :key="n">
              <v-skeleton-loader
                class="mb-6 mt-6"
                type="card"
              ></v-skeleton-loader>
            </v-col>
          </v-row>

          <v-slide-group
            v-model="model"
            class="pa-2 mt-2"
            active-class="success"
            show-arrows
            color="white"
            style="margin-left:-20px"
          >
            <v-slide-item
              v-for="(book, i) in filteredBest"
              :key="i"
              v-slot:default="{ active, toggle }"
            >
              <v-card
                :color="active ? undefined : 'white'"
                class="ma-4"
                height="390"
                width="230"
                flat
                @click="toggle"
              >
                <v-skeleton-loader
                  v-if="loading"
                  type="card"
                  width="100%"
                  elevation="1"
                  height="320px"
                >
                </v-skeleton-loader>

                <v-card elevation="10" width="100%" height="320px">
                  <v-img
                    elevation="24"
                    hover
                    width="100%"
                    height="320px"
                    :src="book.bookcover"
                    @click="bookPage(i, book)"
                  />
                </v-card>
                <p
                  v-if="book.title.length > 18"
                  style="color:black;margin-bottom:0px;padding:10px 10px 0px 10px"
                >
                  {{ String(book.title).slice(0, 18) }}...
                </p>
                <p v-else style="color:black;margin-bottom:0px;padding:10px 10px 0px 10px">
                  {{ book.title }}
                </p>
                <v-rating
                  color="#f5a623"
                  size="9"
                  readonly
                  :value="parseFloat(book.rating)"
                  style="margin-bottom:10px;margin-left:5px"
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
          <div>
            <p
              style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:21px"
              class="font-weight-bold"
            >
              Tell! Publications
            </p>
            <v-btn
              to="/category/tell"
              color="#f66c1f"
              class="pa-4"
              rounded
              text
              style="float:right;font-size:16px;margin-top:10px"
              >See All
            </v-btn>
          </div>
          <br />

          <v-row v-if="loading">
            <v-col v-for="n in 3" :key="n">
              <v-skeleton-loader
                class="mb-6 mt-6"
                type="card"
              ></v-skeleton-loader>
            </v-col>
          </v-row>

          <v-slide-group
            v-model="model"
            class="pa-2 mt-2"
            active-class="success"
            show-arrows
            color="white"
            style="margin-left:-20px"
          >
            <v-slide-item
              v-for="(book, i) in filteredTell"
              :key="i"
              v-slot:default="{ active, toggle }"
            >
              <v-card
                :color="active ? undefined : 'white'"
                class="ma-4"
                height="200"
                width="300"
                flat
                @click="toggle"
              >
                <v-card
                  @click="bookPage(i, book)"
                  class="ma-2 pa-5"
                  style="border-radius:12px"
                  width="300"
                  height="200"
                >
                  <v-row no-gutters>
                    <v-col md="6" sm="6" lg="6">
                      <v-card elevation="10" height="144" width="100">
                        <v-skeleton-loader
                          v-if="loading"
                          class="mb-6 mt-4"
                          type="image"
                          height="144"
                          width="100"
                        ></v-skeleton-loader>
                        <v-img
                          elevation="24"
                          hover
                          height="144"
                          width="100"
                          :src="book.bookcover"
                          @click="bookPage(i, book)"
                        />
                      </v-card>
                    </v-col>
                    <v-col lg="6" sm="6" md="6">
                      <v-skeleton-loader
                        v-if="loading"
                        height="100%"
                        width="100%"
                        type="article"
                      ></v-skeleton-loader>
                      <p
                        style="font-size:15px;margin-bottom:0px;padding:10px 0px 0px -10px"
                      >
                        {{ book.title }}
                      </p>
                      <v-rating
                        color="#f5a623"
                        x-small
                        readonly
                        dense
                        :value="parseFloat(book.rating)"
                        style="margin-bottom:10px;margin-left:0px"
                      ></v-rating>
                      <p
                        v-if="book.description.length > 80"
                        style="margin-top:0px;padding-top:0px;font-size:11px"
                      >
                        {{ String(book.description).slice(0, 80) }}...
                      </p>
                      <p
                        v-else
                        style="margin-top:0px;padding-top:0px;font-size:11px"
                      >
                        {{ book.description }}
                      </p>
                    </v-col>
                  </v-row>
                </v-card>
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

          <div>
            <p
              style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:21px"
              class="font-weight-bold"
            >
              New Books
            </p>
            <v-btn
              to="/category/tell"
              color="#f66c1f"
              class="pa-4"
              rounded
              text
              style="float:right;font-size:16px;margin-top:10px"
              >See All
              </v-btn
            >
          </div>
          <br />

          <v-row v-if="loading">
            <v-col v-for="n in 3" :key="n">
              <v-skeleton-loader
                class="mb-6 mt-6"
                type="card"
              ></v-skeleton-loader>
            </v-col>
          </v-row>

          <v-slide-group
            v-model="model"
            class="pa-2 mt-2"
            active-class="success"
            show-arrows
            color="white"
            style="margin-left:-20px"
          >
            <v-slide-item
              v-for="(book, i) in filteredBooks"
              :key="i"
              v-slot:default="{ active, toggle }"
            >
              <v-card
                :color="active ? undefined : 'white'"
                class="ma-4"
                height="200"
                width="300"
                flat
                @click="toggle"
              >
                <v-card
                  @click="bookPage(i, book)"
                  class="ma-2 pa-5"
                  style="border-radius:12px"
                  width="300"
                  height="200"
                >
                  <v-row no-gutters>
                    <v-col md="6" sm="6" lg="6">
                      <v-card elevation="10" height="144" width="100">
                        <v-skeleton-loader
                          v-if="loading"
                          class="mb-6 mt-4"
                          type="image"
                          height="144"
                          width="100"
                        ></v-skeleton-loader>
                        <v-img
                          elevation="24"
                          hover
                          height="144"
                          width="100"
                          :src="book.bookcover"
                          @click="bookPage(i, book)"
                        />
                      </v-card>
                    </v-col>
                    <v-col lg="6" sm="6" md="6">
                      <v-skeleton-loader
                        v-if="loading"
                        height="100%"
                        width="100%"
                        type="article"
                      ></v-skeleton-loader>
                      <p
                        style="font-size:15px;margin-bottom:0px;padding:10px 0px 0px -10px"
                      >
                        {{ book.title }}
                      </p>
                      <v-rating
                        color="#f5a623"
                        x-small
                        readonly
                        dense
                        :value="parseFloat(book.rating)"
                        style="margin-bottom:10px;margin-left:0px"
                      ></v-rating>
                      <p
                        v-if="book.description.length > 80"
                        style="margin-top:0px;padding-top:0px;font-size:11px"
                      >
                        {{ String(book.description).slice(0, 80) }}...
                      </p>
                      <p
                        v-else
                        style="margin-top:0px;padding-top:0px;font-size:11px"
                      >
                        {{ book.description }}
                      </p>
                    </v-col>
                  </v-row>
                </v-card>
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

          <div>
            <p
              style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:21px"
              class="font-weight-bold"
            >
              Free Books
            </p>
            <v-btn
              to="/category/tell"
              color="#f66c1f"
              class="pa-4"
              rounded
              text
              style="float:right;font-size:16px;margin-top:10px"
              >See All
            </v-btn>
          </div>
          <br />

          <v-row v-if="loading">
            <v-col v-for="n in 3" :key="n">
              <v-skeleton-loader
                class="mb-6 mt-6"
                type="card"
              ></v-skeleton-loader>
            </v-col>
          </v-row>

          <v-slide-group
            v-model="model"
            class="pa-2 mt-2"
            active-class="success"
            show-arrows
            color="white"
            style="margin-left:-20px"
          >
            <v-slide-item
              v-for="(book, i) in filteredFree"
              :key="i"
              v-slot:default="{ active, toggle }"
            >
              <v-card
                :color="active ? undefined : 'white'"
                class="ma-4"
                height="200"
                width="300"
                flat
                @click="toggle"
              >
                <v-card
                  @click="bookPage(i, book)"
                  class="ma-2 pa-5"
                  style="border-radius:12px"
                  width="300"
                  height="200"
                >
                  <v-row no-gutters>
                    <v-col md="6" sm="6" lg="6">
                      <v-card elevation="10" height="144" width="100">
                        <v-skeleton-loader
                          v-if="loading"
                          class="mb-6 mt-4"
                          type="image"
                          height="144"
                          width="100"
                        ></v-skeleton-loader>
                        <v-img
                          elevation="24"
                          hover
                          height="144"
                          width="100"
                          :src="book.bookcover"
                          @click="bookPage(i, book)"
                        />
                      </v-card>
                    </v-col>
                    <v-col lg="6" sm="6" md="6">
                      <v-skeleton-loader
                        v-if="loading"
                        height="100%"
                        width="100%"
                        type="article"
                      ></v-skeleton-loader>
                      <p
                        style="font-size:15px;margin-bottom:0px;padding:10px 0px 0px -10px"
                      >
                        {{ book.title }}
                      </p>
                      <v-rating
                        color="#f5a623"
                        x-small
                        readonly
                        dense
                        :value="parseFloat(book.rating)"
                        style="margin-bottom:10px;margin-left:0px"
                      ></v-rating>
                      <p
                        v-if="book.description.length > 80"
                        style="margin-top:0px;padding-top:0px;font-size:11px"
                      >
                        {{ String(book.description).slice(0, 80) }}...
                      </p>
                      <p
                        v-else
                        style="margin-top:0px;padding-top:0px;font-size:11px"
                      >
                        {{ book.description }}
                      </p>
                    </v-col>
                  </v-row>
                </v-card>
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
        </div>
      </v-col>
    </v-row>
    <!-- Mobile view -->
    <v-main class="hidden-md-and-up">
      <v-main
        width="1500px"
        height="250px"
        class="text-center orangeGradient"
        elevation="24"
        style="margin-top:-1px"
      >
        <div style="padding:10px">
          <v-btn
            @click="goBack"
            class="mt-1"
            style="float:left;color:white"
            text
          >
            <v-icon color="white">mdi-chevron-left</v-icon>Back
          </v-btn>

          <v-spacer />

          <v-btn
            rounded
            elevation="24"
            to="/publish"
            color="white"
            class=" mr-5 mt-2"
            style="font-size:15px;color:#f66c1f;float:right"
          >
            <v-icon class="mr-1" color="#f66c1f">mdi-plus-circle-outline</v-icon
            >Publish
          </v-btn>
        </div>
        <br />
        <div style="text:align:center">
          <v-form @submit.prevent="find()">
            <v-text-field
              style="opacity:0.7;padding:0px 20px 0px 33px;border-radius:12px;font-size:17px;margin:90px 10px 40px 0px"
              solo
              label="Search books by title, author name or category"
              clearable
              max-width="900px"
              color="#008140"
              v-model="search"
              append-icon="mdi-magnify"
              @click:append="find()"
            />
          </v-form>
        </div>
        <!-- </v-img> -->
      </v-main>

      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
        flat
      >
        <v-slide-item
          v-for="(category, i) in categories"
          :key="i"
          v-slot:default="{ active, toggle }"
          flat
        >
          <v-btn
            :color="color[i]"
            class="ma-3 white--text"
            width="120px"
            rounded
            @click="toggle"
            :to="category.link"
          >
            {{ category.category }}
            <v-row class="fill-height" align="center" justify="center" flat>
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="48"
                  flat
                  v-text="'mdi-close-circle-outline'"
                ></v-icon>
              </v-scale-transition>
            </v-row>
          </v-btn>
        </v-slide-item>
      </v-slide-group>

      <p
        style="padding-top:40px;margin-bottom:-30px;padding-left:10px;font-size:19px"
        class="font-weight-bold hidden-lg-and-up"
      >
        Top Rated Books
      </p>
      <v-spacer />
      <v-row v-if="loading">
        <v-col v-for="n in 3" :key="n">
          <v-skeleton-loader class="mb-6 mt-4" type="image"></v-skeleton-loader>
        </v-col>
      </v-row>

      <div v-if="!loading" class="mt-6 scrollbook">
        <div
          v-for="(book, i) in filteredTop"
          :key="i"
          class="card d-flex flex-row"
        >
          <v-card class="ma-4" width="160" height="260" flat>
            <v-skeleton-loader
              v-if="loading"
              class="mb-6 mt-4"
              type="image"
              height="230"
              width="160"
            ></v-skeleton-loader>
            <v-card elevation="10" height="230" width="160">
              <v-img
                elevation="24"
                hover
                height="230"
                width="160"
                :src="book.bookcover"
                @click="bookPage(i, book)"
              />
            </v-card>
            <p
              v-if="book.title.length > 15"
              style="font-size:15px;margin-bottom:0px;padding:10px 10px 0px 10px"
            >
              {{ String(book.title).slice(0, 15) }}...
            </p>
            <p
              v-else
              style="font-size:15px;margin-bottom:0px;padding:10px 10px 0px 10px"
            >
              {{ book.title }}
            </p>
            <v-rating
              color="#f5a623"
              x-small
              readonly
              :value="parseFloat(book.rating)"
              style="margin-bottom:10px;margin-left:5px"
            ></v-rating>
          </v-card>
        </div>
      </div>

      <p
        style="padding-top:40px;margin-bottom:-20px;padding-left:10px;font-size:19px"
        class="font-weight-bold hidden-lg-and-up"
      >
        Bestsellers
      </p>

      <v-row v-if="loading">
        <v-col v-for="n in 3" :key="n">
          <v-skeleton-loader class="mb-6 mt-4" type="image"></v-skeleton-loader>
        </v-col>
      </v-row>

      <div v-if="!loading" class="mt-6 scrollbook">
        <div
          v-for="(book, i) in filteredBest"
          :key="i"
          class="card d-flex flex-row"
        >
          <v-card class="ma-4" width="160" height="260" flat>
            <v-card elevation="10" height="230" width="160">
              <v-img
                elevation="24"
                hover
                height="230"
                width="160"
                :src="book.bookcover"
                @click="bookPage(i, book)"
              />
            </v-card>
            <p
              v-if="book.title.length > 18"
              style="text-align:center;font-size:15px;margin-bottom:0px;padding:10px 10px 0px 10px"
            >
              {{ String(book.title).slice(0, 18) }}...
            </p>
            <p
              v-else
              style="font-size:15px;margin-bottom:0px;padding:10px 10px 0px 10px"
            >
              {{ book.title }}
            </p>
            <v-rating
              color="#f5a623"
              x-small
              readonly
              :value="parseFloat(book.rating)"
              style="margin-bottom:10px;margin-left:5px"
            ></v-rating>
          </v-card>
        </div>
      </div>
      <div>
        <p
          style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:19px"
          class="font-weight-bold hidden-lg-and-up"
        >
          Tell! Publications
        </p>
        <v-btn
          href="/category/children"
          style="float:right;font-size:12px;text-decoration:none;padding-right:12px;margin-top:21px"
          color="#f66c1f"
          rounded
          text
          x-small
          >See All</v-btn
        >
      </div>
      <br />

      <v-row v-if="loading">
        <v-col v-for="n in 2" :key="n">
          <v-skeleton-loader class="mb-6 mt-6" type="card"></v-skeleton-loader>
        </v-col>
      </v-row>

      <div v-if="!loading" class="mt-6 scrollmenu">
        <div
          v-for="(book, i) in filteredTell"
          :key="i"
          class="card d-flex flex-row"
        >
          <v-card
            @click="bookPage(i, book)"
            class="ma-2 pa-5"
            style="border-radius:12px"
            width="300"
            height="200"
          >
            <v-row no-gutters>
              <v-col md="6" sm="6" lg="6">
                <v-card elevation="10" height="144" width="100">
                  <v-skeleton-loader
                    v-if="loading"
                    class="mb-6 mt-4"
                    type="image"
                    height="144"
                    width="100"
                  ></v-skeleton-loader>
                  <v-img
                    elevation="24"
                    hover
                    height="144"
                    width="100"
                    :src="book.bookcover"
                    @click="bookPage(i, book)"
                  />
                </v-card>
              </v-col>
              <v-col lg="6" sm="6" md="6">
                <v-skeleton-loader
                  v-if="loading"
                  height="100%"
                  width="100%"
                  type="article"
                ></v-skeleton-loader>
                <p
                  style="font-size:15px;margin-bottom:0px;padding:10px 0px 0px 0px"
                >
                  {{ book.title }}
                </p>
                <v-rating
                  color="#f5a623"
                  x-small
                  readonly
                  dense
                  :value="parseFloat(book.rating)"
                  style="margin-bottom:10px;margin-left:0px"
                ></v-rating>
                <p
                  v-if="book.description.length > 70"
                  style="margin-top:0px;padding-top:0px;font-size:11px"
                >
                  {{ String(book.description).slice(0, 70) }}...
                </p>
                <p v-else style="margin-top:0px;padding-top:0px;font-size:11px">
                  {{ book.description }}
                </p>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </div>
      <div>
        <p
          style="margin-top:0px;margin-bottom:-47px;padding-left:10px;font-size:19px"
          class="font-weight-bold hidden-lg-and-up"
        >
          New Books
        </p>
        <v-btn
          to="/category/self-help"
          style="float:right;font-size:12px;padding:5px;margin-top:21px"
          color="#f66c1f"
          rounded
          text
          x-small
          >See All</v-btn
        >
      </div>
      <br />

      <v-row v-if="loading">
        <v-col v-for="n in 2" :key="n">
          <v-skeleton-loader class="mb-6 mt-6" type="card"></v-skeleton-loader>
        </v-col>
      </v-row>

      <div v-if="!loading" class="mt-6 scrollmenu">
        <div
          v-for="(book, i) in filteredBooks"
          :key="i"
          class="card d-flex flex-row"
        >
          <v-card
            @click="bookPage(i, book)"
            class="ma-2 pa-5"
            style="border-radius:12px"
            width="300"
            height="200"
          >
            <v-row no-gutters>
              <v-col md="6" sm="6" lg="6">
                <v-card elevation="10" height="144" width="100">
                  <v-skeleton-loader
                    v-if="loading"
                    class="mb-6 mt-4"
                    type="image"
                    height="144"
                    width="100"
                  ></v-skeleton-loader>
                  <v-img
                    elevation="24"
                    hover
                    height="144"
                    width="100"
                    :src="book.bookcover"
                    @click="bookPage(i, book)"
                  />
                </v-card>
              </v-col>
              <v-col lg="6" sm="6" md="6">
                <v-skeleton-loader
                  v-if="loading"
                  height="100%"
                  width="100%"
                  type="article"
                ></v-skeleton-loader>
                <p
                  style="font-size:15px;margin-bottom:0px;padding:10px 0px 0px -10px"
                >
                  {{ book.title }}
                </p>
                <v-rating
                  color="#f5a623"
                  x-small
                  readonly
                  dense
                  :value="parseFloat(book.rating)"
                  style="margin-bottom:10px;margin-left:0px"
                ></v-rating>
                <p
                  v-if="book.description.length > 80"
                  style="margin-top:0px;padding-top:0px;font-size:11px"
                >
                  {{ String(book.description).slice(0, 80) }}...
                </p>
                <p v-else style="margin-top:0px;padding-top:0px;font-size:11px">
                  {{ book.description }}
                </p>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </div>

      <div>
        <p
          style="margin-top:0px;margin-bottom:-47px;padding-left:10px;font-size:19px"
          class="font-weight-bold hidden-lg-and-up"
        >
          Free Books
        </p>
        <v-btn
          to="/category/self-help"
          style="float:right;font-size:12px;padding:5px;margin-top:21px"
          color="#f66c1f"
          rounded
          text
          x-small
          >See All</v-btn
        >
      </div>
      <br />

      <v-row v-if="loading">
        <v-col v-for="n in 2" :key="n">
          <v-skeleton-loader class="mb-7 mt-6" type="card"></v-skeleton-loader>
        </v-col>
      </v-row>

      <div v-if="!loading" style="margin-bottom:70px" class="mt-6 scrollmenu">
        <div
          v-for="(book, i) in filteredFree"
          :key="i"
          class="card d-flex flex-row"
        >
          <v-card
            @click="bookPage(i, book)"
            class="ma-2 pa-5"
            style="border-radius:12px"
            width="300"
            height="200"
          >
            <v-row no-gutters>
              <v-col md="6" sm="6" lg="6">
                <v-card elevation="10" height="144" width="100">
                  <v-skeleton-loader
                    v-if="loading"
                    class="mb-6 mt-4"
                    type="image"
                    height="144"
                    width="100"
                  ></v-skeleton-loader>
                  <v-img
                    elevation="24"
                    hover
                    height="144"
                    width="100"
                    :src="book.bookcover"
                    @click="bookPage(i, book)"
                  />
                </v-card>
              </v-col>
              <v-col lg="6" sm="6" md="6">
                <v-skeleton-loader
                  v-if="loading"
                  height="100%"
                  width="100%"
                  type="article"
                ></v-skeleton-loader>
                <p
                  style="font-size:15px;margin-bottom:0px;padding:10px 0px 0px -10px"
                >
                  {{ book.title }}
                </p>
                <v-rating
                  color="#f5a623"
                  x-small
                  readonly
                  dense
                  :value="parseFloat(book.rating)"
                  style="margin-bottom:10px;margin-left:0px"
                ></v-rating>
                <p
                  v-if="book.description.length > 80"
                  style="margin-top:0px;padding-top:0px;font-size:11px"
                >
                  {{ String(book.description).slice(0, 80) }}...
                </p>
                <p v-else style="margin-top:0px;padding-top:0px;font-size:11px">
                  {{ book.description }}
                </p>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </div>
    </v-main>
    <BottomMenu class="hidden-md-and-up" />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import BottomMenu from "@/components/BottomMenu";
import { mapGetters } from "vuex";
import firebase from "firebase/app";

export default {
  components: {
    NavBar,
    BottomMenu,
  },

  data() {
    return {
      search: "",
      person: "",
      IDs: [],
      md: 12,
      sm: 12,
      lg: 12,
      overlay: false,
      model: null,
      fiction: [],
      nonFiction: [],
      Children: [],
      categories: [
        { category: "Adventure", link: "/category/adventure" },
        { category: "Anthology", link: "/category/anthology" },
        { category: "Comics", link: "/category/comics" },
        { category: "Children", link: "/category/children" },
        { category: "Fiction", link: "/category/fiction" },
        { category: "Finance ", link: "/category/finance" },
        { category: "Nonfiction", link: "/category/nonfiction" },
        { category: "Romance", link: "/category/romance" },
        { category: "Self-help", link: "/category/romance" },
      ],
      color: [
        "#f66c1f",
        "#0070FF",
        "#046624",
        "#1773ea",
        "#ff6254",
        "#000000",
        "#FF3C07",
        "#f66c1f",
        "#1773ea",
      ],
    };
  },

  computed: {
    ...mapGetters({
      books: "books",
      loading: "loading",
      user: "user",
    }),

    filteredBooks() {
      return this.books.slice(0, 5);
    },

    filteredTop() {
      return this.books.filter((book) => book.rating >= 3).slice(0, 5);
    },

    filteredBest() {
      return this.books.filter((book) => book.readers.length >= 20).slice(0, 5);
    },

    filteredTell() {
      return this.books.filter((book) => book.author == "tell").slice(0, 5);
    },

    filteredFree() {
      return this.books.filter((book) => book.price == 0).slice(0, 5);
    },
  },

  created() {
    window.scrollTo(0, 0);
    this.$store.dispatch("bindBooks");
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.person = user;
      if (this.person != null) {
        this.sm = 10;
        this.md = 10;
        this.lg = 10;
      }
    });
  },
  methods: {
    find() {
      this.$router.push(`/search?key=${this.search}`);
    },

    bookPage(i, book) {
      this.bookID = this.IDs[i];
      if (book.filetype == "Audio") {
        this.$router.push({
          name: "Audio",
          params: { id: book.slug, book: book, bookID: this.bookID },
        });
      } else if (book.filetype == "Chatbooks") {
        this.$router.push({
          name: "Chat",
          params: { id: book.slug, book: book, bookID: this.bookID },
        });
      } else {
        this.$router.push({
          name: "Books",
          params: { id: book.slug, book: book, bookID: this.bookID },
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.orangeGradient {
  background: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
}

div.scrollbook {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 300px;
}

div.scrollmenu {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  height: 230px;
}

div.scrollmenu .card {
  flex: 0 0 auto;
}
</style>
