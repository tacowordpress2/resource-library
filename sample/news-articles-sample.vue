<template>
  <div class="article-list resource-library" :class="{loading: loading}">

    <!-- Loading and error screens -->
    <transition name="vue-fade">
      <div class="content-popup" v-if="loading">
        <h2>Loading...</h2>
      </div>
    </transition>
    <transition name="vue-fade">
      <div class="content-popup" v-if="!loading && resources.length === 0">
        <h2>No results found.</h2>
      </div>
    </transition>
    <transition name="vue-fade">
      <div class="content-popup" v-if="error">
        <h4>An error has occurred while loading articles. Please try again.</h4>
      </div>
    </transition>
    <!-- End loading and error screens -->

    <!-- Results screen -->
    <transition name="vue-fade">
      <div v-if="!loading && resources.length > 0">
        <div class="row columns tags results-info">
          <i>Results:</i> <strong>{{pagination_data.total}}</strong>
        </div>
        <!-- Iterate through resources and display them.  This will always in accessible in the resouces property -->
        <ul class="article-list">
          <li v-for="resource in resources" :key="resource.id">
            <article class="row">
              <div class="columns medium-4">
                <div class="row">
                  <div class="columns small-10 small-centered medium-12">
                    <figure class="image has-caption">
                      <img :src="resource.getFeaturedImage('thumbnail')" />
                      <figcaption class="caption" v-html="resource.featured_image_caption"></figcaption>
                    </figure>
                </div>
              </div>
              <div class="columns medium-8">
                <p class="minor-label">{{resource.human_date}}</p>
                <h3><a class="link-gray-dark" :href="resource.link" v-html="resource.title"></a></h3>
                <p v-html="resource.excerpt"></p>

                <div class="taxonomy" v-if="resource.terms['post-tag']">
                  <p class="minor-label">Tags: </p>
                  <ul class="tags">
                    <li v-for="tag in resource.terms['post-tag']" :key="tag.id">
                      <!-- Handle clicking and selecting terms -->
                      <a href="" @click.prevent="setTerms('post-tag', tag.id, triggerRootEvent.bind(this, 'set_tag', {tag: tag.id}))">{{tag.name}}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </li>
        </ul>
        <!-- End resources -->

        <!-- Pagination - this data will always be present in the pages property -->
        <ul class="row columns pagination">
          <li v-for="page in pages" :key="page" class="page-number" :class="{selected: (query_params.page === page)}">
            <a v-if="!isNaN(parseInt(page))" href="" @click.prevent="selectPage(page)">{{page}}</a>
            <span v-else v-html="page"></span>
          </li>
          <li class="prev-next" v-if="query_params.page !== pagination_data.total_pages">
            <a href="" class="expanding-link dark" @click.prevent="selectPage(query_params.page + 1)">Next</a>
          </li>
          <li class="prev-next" v-if="query_params.page !== 1">
            <a href="" class="return-link dark" @click.prevent="selectPage(query_params.page - 1)">Previous</a>
          </li>
        </ul>
        <!-- End pagination -->
      </div>
    </transition>
    <!-- End results screen -->
  </div>
</template>

<script>
  import ResourceLibrary from 'resource-library';

  let instance = ResourceLibrary();

  // Pass initial properties back to the interface after create.
  instance.methods.afterCreated = function() {
    this.triggerRootEvent('set_value', {'topic': _.get(this, ['params' ,'grant-categories', 0])});
    this.triggerRootEvent('set_value', {'year': _.get(this, ['params', 'meta_query', 'post-year', 'value'])});
    this.triggerRootEvent('set_value', {'keyword': _.get(this, ['params', 'search'])});
  }

  export default instance;
</script>