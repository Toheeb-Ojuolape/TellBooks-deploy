<template>
  <v-app>
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
          class="white--text mr-5"
          style="font-size:15px;"
        >
          <v-icon class="mr-1">mdi-plus-circle-outline</v-icon> Publish Book
        </v-btn>
      </v-toolbar>

      <v-toolbar class="md-4 hidden-lg-and-up" color="white">
        <v-btn @click="goBack" style="color:#f66c1f" text>
          <v-icon color="#f66c1f">mdi-chevron-left</v-icon>Back
        </v-btn>

        <v-spacer />

        <v-btn
          rounded
          elevation="24"
          to="/publish"
          color="#f66c1f"
          class=" mr-5"
          style="font-size:15px;color:white"
        >
          <v-icon class="mr-1" color="white">mdi-plus-circle-outline</v-icon
          >Publish
        </v-btn>
      </v-toolbar>
    </v-card>
    <NavBar />
    <v-container class="hidden-md-and-down">
      <v-card
        width="1500px"
        height="300px"
        color="#f66c1f"
        class="mt-9 text-center"
        elevation="24"
      >
        <v-img
          style="padding-top:40px"
          width="1500px"
          height="350px"
          src="https://res.cloudinary.com/tell/image/upload/v1602797965/tellbooks_bookshelf_zkoutd.png"
        >
          <v-text-field
            v-model="search"
            rounded
            elevation="24"
            color="#f66c1f"
            label="Search by book title, author or category"
            solo
            prepend-inner-icon="mdi-magnify"
            style="padding-top:150px;padding-left:70px;padding:100px"
          />
        </v-img>
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
        style="padding-top:40px;margin-bottom:-30px;padding-left:10px;font-size:19px"
        class="font-weight-bold"
      >
        Top rated Books
      </p>
      <v-spacer />

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
        class="pa-2 mt-2"
        active-class="success"
        show-arrows
        color="white"
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
            height="320"
            width="210"
            elevation="7"
            @click="toggle"
          >
            <v-img
              v-if="book.filetype == 'Audio'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="audioPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Chatbook'"
              elevation="24"
              hover
              width="210px"
              height="320px"
              :src="book.bookcover"
              @click="chatPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Pdf' || book.filetype == 'Epub'"
              elevation="24"
              hover
              width="210px"
              height="320px"
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

      <p
        style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:19px"
        class="font-weight-bold"
      >
      Bestsellers
      </p>
      <v-btn
        to="/category/tell"
        color="black"
        class="pa-4"
        rounded
        style="font-size:10px;text-decoration:none;margin-left:760px;margin-top:10px;color:white"
        x-small
        >see all <v-icon class="white--text">mdi-chevron-right</v-icon></v-btn
      >
      <v-spacer />

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
            height="320"
            width="210"
            elevation="7"
            @click="toggle"
          >
            <v-img
              v-if="book.filetype == 'Audio'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="audioPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Chatbook'"
              elevation="24"
              hover
              width="210px"
              height="320px"
              :src="book.bookcover"
              @click="chatPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Pdf' || book.filetype == 'Epub'"
              elevation="24"
              hover
              width="210px"
              height="320px"
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

      <p
        style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:19px"
        class="font-weight-bold "
      >
        Tell! Publications
      </p>
      <v-btn
        to="/category/tell"
        color="black"
        class="pa-4"
        rounded
        style="font-size:10px;text-decoration:none;margin-left:760px;margin-top:10px;color:white"
        x-small
        >see all <v-icon class="white--text">mdi-chevron-right</v-icon></v-btn
      >
      <v-spacer />

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
            height="320"
            width="210"
            elevation="7"
            @click="toggle"
          >
           <v-img
              v-if="book.filetype == 'Audio'"
              elevation="24"
              hover
              width="100%"
              max-height="320"
              :src="book.bookcover"
              @click="audioPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Chatbook'"
              elevation="24"
              hover
              width="210px"
              height="320px"
              :src="book.bookcover"
              @click="chatPage(i, book)"
            />
            <v-img
            v-if="book.filetype == 'Pdf' || book.filetype == 'Epub'"
              elevation="24"
              hover
              width="210px"
              height="320px"
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

      <p
        style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:19px"
        class="font-weight-bold"
      >
        New Books
      </p>
      <v-btn
        to="/category/tell"
        color="black"
        class="pa-4"
        rounded
        style="font-size:10px;text-decoration:none;margin-left:760px;margin-top:10px;color:white"
        x-small
        >see all <v-icon class="white--text">mdi-chevron-right</v-icon></v-btn
      >
      <v-spacer />

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
            height="320"
            width="210"
            elevation="7"
            @click="toggle"
          >
            <v-img
              v-if="book.filetype == 'Audio'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="audioPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Chatbook'"
              elevation="24"
              hover
              width="210px"
              height="320px"
              :src="book.bookcover"
              @click="chatPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Pdf' || book.filetype == 'Epub'"
              elevation="24"
              hover
              width="210px"
              height="320px"
              :src="book.bookcover"
              @click="bookPage(i, book)"
            />
            <v-rating
              color="#f5a623"
              size="9"
              readonly
              :value="parseFloat(book.rating)"
              class="margin-bottom:29px"
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
        style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:19px"
        class="font-weight-bold"
      >
        Free Books
      </p>
      <v-btn
        to="/category/free"
        color="black"
        class="pa-4"
        rounded
        style="font-size:10px;text-decoration:none;margin-left:760px;margin-top:10px;color:white"
        x-small
        >see all <v-icon class="white--text">mdi-chevron-right</v-icon></v-btn
      >
      <v-spacer />

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
        class="pa-2 mt-2"
        active-class="success"
        show-arrows
        color="white"
        style="margin-left:-20px;margin-bottom:30px"
      >
        <v-slide-item
          v-for="(book, i) in filteredBooks"
          :key="i"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            :color="active ? undefined : 'white'"
            class="ma-4"
            height="320"
            width="210"
            elevation="7"
            @click="toggle"
          >
            <v-img
              v-if="book.filetype == 'Audio'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="audioPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Chatbook'"
              elevation="24"
              hover
              width="210px"
              height="320px"
              :src="book.bookcover"
              @click="chatPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Pdf' || book.filetype == 'Epub'"
              elevation="24"
              hover
              width="210px"
              height="320px"
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
    </v-container>
    <!-- Mobile view -->
    <v-container class="hidden-lg-and-up">
      <v-card
        width="1500px"
        height="250px"
        color="#f66c1f"
        class="mt-9 text-center"
        elevation="24"
      >
        <v-img
          style="padding-top:40px"
          width="1500px"
          height="250px"
          src="https://res.cloudinary.com/tell/image/upload/v1602797965/tellbooks_bookshelf_zkoutd.png"
        >
          <v-layout flat style="margin-top:40px" transparent>
            <v-text-field
              v-model="search"
              rounded
              elevation="24"
              color="#f66c1f"
              label="Search by book title, author or category"
              solo
              prepend-inner-icon="mdi-magnify"
              style="padding-top:100px;padding-bottom:50px;padding:25px"
            />
          </v-layout>
        </v-img>
      </v-card>

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
            height="190"
            width="120"
            elevation="7"
            @click="toggle"
          >
            <v-img
              v-if="book.filetype == 'Audio'"
              elevation="24"
              hover
              width="120"
              height="190"
              :src="book.bookcover"
              @click="audioPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Chatbook'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="chatPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Pdf' || book.filetype == 'Epub'"
              elevation="24"
              hover
              width="100%"
              height="100%"
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

      <p
        style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:19px"
        class="font-weight-bold hidden-lg-and-up"
      >
        Bestsellers
      </p>
      <v-btn
        href="/category/tell"
        style="font-size:10px;text-decoration:none;padding:5px;margin-left:250px;color:white;margin-top:17px"
        color="black"
        rounded
        x-small
        >see all</v-btn
      >
      <v-spacer />

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
            height="190px"
            width="120px"
            elevation="7"
            @click="toggle"
          >
            <v-img
              v-if="book.filetype == 'Audio'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="audioPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Chatbook'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="chatPage(i, book)"
            />
            <v-img
             v-if="book.filetype == 'Pdf' || book.filetype == 'Epub'"
              elevation="24"
              hover
              width="100%"
              height="100%"
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

      <p
        style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:19px"
        class="font-weight-bold hidden-lg-and-up"
      >
        Tell! Publications
      </p>
      <v-btn
        href="/category/children"
        style="font-size:10px;text-decoration:none;padding:5px;margin-left:250px;color:white;margin-top:17px"
        color="black"
        rounded
        x-small
        >see all</v-btn
      >
      <v-spacer />

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
            height="190"
            width="120"
            elevation="7"
            @click="toggle"
          >
            <v-img
              v-if="book.filetype == 'Audio'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="audioPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Chatbook'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="chatPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Pdf' || book.filetype == 'Epub'"
              elevation="24"
              hover
              width="100%"
              height="100%"
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

      <p
        style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:19px"
        class="font-weight-bold hidden-lg-and-up"
      >
        New Books
      </p>
      <v-btn
        href="/category/self-help"
        style="font-size:10px;text-decoration:none;padding:5px;margin-left:250px;color:white;margin-top:17px"
        color="black"
        rounded
        x-small
        >see all</v-btn
      >
      <v-spacer />

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
            height="190"
            width="120"
            elevation="7"
            @click="toggle"
          >
            <v-img
              v-if="book.filetype == 'Audio'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="audioPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Chatbook'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="chatPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Pdf' || book.filetype == 'Epub'"
              elevation="24"
              hover
              width="100%"
              height="100%"
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

      <p
        style="padding-top:40px;margin-bottom:-47px;padding-left:10px;font-size:19px"
        class="font-weight-bold hidden-lg-and-up"
      >
        Free Books
      </p>
      <v-btn
        href="/category/tell"
        style="text-decoration:none;font-size:10px;padding:5px;margin-left:250px;color:white;margin-top:17px"
        color="black"
        rounded
        x-small
        >see all</v-btn
      >
      <v-spacer />

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
          v-for="(book, i) in filteredFree"
          :key="i"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            :color="active ? undefined : 'white'"
            class="ma-4"
            height="190"
            width="120"
            elevation="7"
            @click="toggle"
          >
            <v-img
              v-if="book.filetype == 'Audio'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="audioPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Chatbook'"
              elevation="24"
              hover
              width="100%"
              height="100%"
              :src="book.bookcover"
              @click="chatPage(i, book)"
            />
            <v-img
              v-if="book.filetype == 'Pdf' || book.filetype == 'Epub'"
              elevation="24"
              hover
              width="100%"
              height="100%"
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
    </v-container>
    <BottomMenu />
    
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import BottomMenu from "@/components/BottomMenu";
import {mapGetters} from "vuex"

export default {
  components: {
    NavBar,
    BottomMenu
  },

  data() {
    return {
      search: "",
      IDs: [],
      overlay: false,
      model: null,
      fiction:[],
      nonFiction:[],
      Children:[],
      categories: [
        { category: "Adventure", link: "/category/adventure" },
        { category: "Anthology", link: "/category/anthology" },
        { category: "Comics", link: "/category/comics" },
        { category: "Children", link: "/category/children" },
        { category: "Fiction", link: "/category/fiction" },
        { category: "Finance ", link: "/category/finance" },
        { category: "Nonfiction", link: "/category/nonfiction" },
        { category: "Romance", link: "/category/romance" },
        { category: "Self-help", link: "/category/romance" }
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
        "#1773ea"
      ]
    };
  },

  computed: {
    ...mapGetters({
     books:"books",
     loading:"loading"
    }),
    
    filteredBooks() {
      const searchBooks = this.search.toLowerCase().trim();

      if (!searchBooks) return this.books;

      return this.books.filter(
        book => book.title.toLowerCase().indexOf(searchBooks) > -1
      );
    },

    filteredTop() {
      const searchBooks = this.search.toLowerCase().trim();
      const topBooks = this.books.filter(book => book.rating >= 3)
      if (!searchBooks) return topBooks;
      return topBooks.filter(
        book => book.title.toLowerCase().indexOf(searchBooks) > -1
      );
    },

    filteredBest(){
      const searchBooks = this.search.toLowerCase().trim();
      const bestBooks = this.books.filter(book => book.readers.length >= 20)
      if (!searchBooks) return bestBooks;

      return bestBooks.filter(
        book => book.title.toLowerCase().indexOf(searchBooks) > -1
      );
    },

    filteredTell(){
      const searchBooks = this.search.toLowerCase().trim();
      const tellBooks = this.books.filter(book => book.author == "tell")
      if (!searchBooks) return tellBooks;

      return tellBooks.filter(
        book => book.title.toLowerCase().indexOf(searchBooks) > -1
      );
    },

    filteredFree(){
      const searchBooks = this.search.toLowerCase().trim();
      const freeBooks = this.books.filter(book => book.price == 0)
      if (!searchBooks) return freeBooks;

      return freeBooks.filter(
        book => book.title.toLowerCase().indexOf(searchBooks) > -1
      );
    }



  },

 created() {
  window.scrollTo(0,0);
  this.$store.dispatch('bindBooks')
  },
  methods: {

    audioPage(i, book) {
      this.bookID = this.IDs[i];
      this.$router.push({
        name: "Audio",
        params: { id: book.slug, book: book, bookID: this.bookID }
      });
    },

    bookPage(i, book) {
      this.bookID = this.IDs[i];
      this.$router.push({
        name: "Books",
        params: { id: book.slug, book: book, bookID: this.bookID }
      });
    },
    chatPage(i, book) {
      this.bookID = this.IDs[i];
      this.$router.push({
        name: "Chat",
        params: { id: book.slug, book: book, bookID: this.bookID }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>
