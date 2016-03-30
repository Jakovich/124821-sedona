"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          "build/css/style.css": ["less/style.less"]
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: [
            "last 1 version",
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 2 Opera versions",
            "last 2 Edge versions"
          ]}),
          require("css-mqpacker")({
            sort: true
          })
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "./build",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy:html"],
        options: {spawn: false}
      },

      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss", "csso"],
        options: {
          spawn: false
        }
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          src : [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*html"
            ],
          dest: "build"
        }]
      },
      html: {
        files: [{
          expand: true,
          src: ["*.html"],
          dest: "build"
        }]
      }
    },

  clean: {
    build: ["build"]
  },

  csso: {
    style: {
      options: {
        report: "gzip"
      },
      files: {
        "build/css/style.min.css": ["build/css/style.css"]
      }
    }
  },

  imagemin: {
    images: {
      options: {
        optimizationLevel: 3
      },
      files: [{
        expand: true,
        src: ["build/img/**/*.{png,jpg,gif}"]
      }]
    }
  },

  uglify: {
    js_min: {
      files: {
        "build/js/main.min.js": ["build/js/main.js"]
      }
    }
  },

  svgmin: {
    symbols: {
      files: [{
        expand: true,
        src: ["build/img/*.svg"]
      }]
    }
  }




  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "csso",
    "uglify",
    "imagemin"
    ]);
};
