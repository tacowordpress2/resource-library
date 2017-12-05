$(function() {
  // Create Vue component
  Vue.component('news-articles-sample', NewsArticlesSample);

  // Mount Vue component on the #news-articles element
  let vue_root = new Vue({
    el: '#news-articles'
  });

  // Grab the actual resource library instance
  let resource_library = vue_root.$refs.main;

  // Handle event from a triggerRootEvent call.  The details of the call are in e.detail
  $('#news-articles').on('set_value', function(e) {
    for (let item in e.detail) {
      if (e.detail[item]) {
        $('#' + item).val(e.detail[item]);
      }
    }
  });

  // Handle a triggerRootEvent set_tag call when a tag is selected in the resource library
  $('#news-articles').on('set_tag', function(e) {
    $('#topic').val(e.detail.tag);
  });

  // Pass filters to resource library on submit
  $('#filters').on('submit', function(e) {
    e.preventDefault();
    resource_library.setSearch($('#keyword').val());
  });

  // Reset filters on resource library
  $('#filters').on('reset', function(e) {
    resource_library.reset();
  });

  // Set taxonomy terms to filter on.  In this case, it's on post-tag
  $('#topic').on('change', function(e) {
    e.preventDefault();
    if ($(this).val() === '') {
      resource_library.resetTerms('post-tag');
    } else {
      resource_library.setTerms('post-tag', $(this).val());
    }
  });

  // Set a meta filter.  In this case, it's on post-year
  $('#year').on('change', function(e) {
    e.preventDefault();
    if ($(this).val() !== '') {
      resource_library.setMetaFilter('post-year', $(this).val());
    } else {
      resource_library.removeMetaFilter('post-year');
    }
  });

  // Change field to order bty
  $('#order').on('change', function(e) {
    resource_library.setOrder($(this).val());
  });

  // Change order direction
  $('#orderby').on('change', function(e) {
    resource_library.setOrderBy($(this).val());
  });
})