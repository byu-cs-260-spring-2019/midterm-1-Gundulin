var app = new Vue({
    el: '#app',
    /** Data Section */
    data: {
        pageTitle: 'The Cosmic Librarian',
        url: 'http://openlibrary.org/search.json?q=', /* http://openlibrary.org/search.json?q=the+lord+of+the+rings */
        searchData: '',
        imageURL1: 'https://openlibrary.org/api/books?bibkeys=',
        imageURL2: '&jscmd=details&format=json',
        loading: false,
        searched: false,
        books: [{
            title: '',
            author: '',
            cover: '',
            publishDate: '',
        }],
        favorites: [{}],
    },
    /** Methods Section */
    methods: {
        async search() {
            this.loading = true;
            this.searched = false;
            try {
                const response = await(axios.get(this.url + this.searchData));
                console.log(response.data.numFound);
                console.log(response);
                for (i = 0; i < response.data.numFound - 1; i++)
                {
                    // var isbn1 = "ISBN:" + response.data.docs[i].isbn[0];
                    // var imFetch = await(axios.get(this.imageURL1 + isbn1 + this.imageURL2));
                    // console.log(imFetch);
                    this.books.push({
                        title: response.data.docs[i].title,
                        author: response.data.docs[i].author_name,
                        // ISBN: response.data.docs[i].isbn[0],
                        // cover: imFetch.data.thumbnail_url,
                        publishDate: response.data.docs[i].first_publish_year,
                    }); 
                    // console.log(this.books[i].title);
                    // console.log(this.books[i].cover);
                }
            } catch (error) {
                console.log(error);
            }
            this.loading = false;
            this.searched = true;
        },
    },
    /** Watch Section */
    watch: {

    }

})