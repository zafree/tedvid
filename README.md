# TEDvid - TED style hero-video

TEDvid is a TED style hero-video that goes sticky when you scroll your shit/bar/page, as seen on [TEDtalks](https://www.ted.com/talks/elon_musk_the_mind_behind_tesla_spacex_solarcity). Applicable only for Youtube and Vimeo.

### Demo
https://zafree.github.io/tedvid

### Dependencies

1. [JQuery](https://code.jquery.com/jquery-2.2.4.min.js)
2. [Waypoints](https://cdnjs.cloudflare.com/ajax/libs/waypoints/3.1.1/jquery.waypoints.min.js)

Note:
I used Bootstrap Grid here. You can use any other. If you need help regarding this then you can create an issue or let me know directly.

### How

1. Link CSS files to your site or application

  ```html
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
   <link rel="stylesheet" href="css/tedvid.min.css">
  ```

2. Link JS files to your site or application (add `<script>` to bottom of page)

```html
 <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/3.1.1/jquery.waypoints.min.js"></script>
 <script src="js/tedvid.js"></script>
```

3. Load Vimeo/Youtube API `<script>` to bottom of `<head>`

```html
<head>
    ...
    <!--load if vimeo  -->
    <script src="http://a.vimeocdn.com/js/froogaloop2.min.js"></script>
    <!--load if youtube  -->
    <script src="https://www.youtube.com/iframe_api"></script>
</head>
```


4. Set `data-provider=""` and set your video ID `74605993`. (Keep `player_id=vimeo` for vimeo `src`)

  ```html
  <iframe data-provider="vimeo" class="embed-responsive-item" src="https://player.vimeo.com/video/74605993?api=1&player_id=vimeo" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
  ```

5. Set your poster image `src` (Image Ration 16:9 for better serve)

  ```html
  <img id="Video__poster" class="Video__poster" src="imgs/poster.jpg" alt="..." />
  ```

6. And finally you can edit the content as you want. Wow.


### Why

It's the TED style that goes sticky when you scroll your page. That's really aewsome. Wow.


### Where

TEDvid should (in theory) work in all relevant browsers (ie9+). If not, create an issue! Thanks!


### Who

Written by <a href="http://zafree.github.io/">Zafree</a>, made better by you.
