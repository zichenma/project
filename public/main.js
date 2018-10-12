let blogApp = angular.module('myBlog', ['ngRoute']);

blogApp.config(function ($routeProvider) {
    $routeProvider.caseInsensitiveMatch = true;
    $routeProvider
    .when('/blogInput', {
        templateUrl: "templates/blogInput.html",
        controller: "mainCtr"
    })
    .when('/blog', {
        templateUrl: "templates/blog.html",
        controller: "blogCtr",
    })
    .otherwise({
        redirectTo:'/blogInput'
    })
})

blogApp.controller('mainCtr', function ($scope) {
    $scope.blogs = [];

    $scope.validate = function (title, author, body) {
        if (   
               title === '' 
            || author === ''
            || body === ''
            || title.trim() == null
            || body.trim() == null
            || author.trim() == null) {
                return false;
            }
            return true;
    };

    $scope.submit = function () {
        if (!$scope.validate($scope.blog.title, $scope.blog.author, $scope.blog.body)) {
            return;
        }
        let newBlog = {
            title : $scope.blog.title,
            author : $scope.blog.author,
            body : $scope.blog.body,
            time: new Date().toISOString()
        }
        $scope.blogs = $scope.pushToLocal(newBlog);
        location.href = '#/blog';
    };

    $scope.pushToLocal = function (blog) {
        let localBlog = JSON.parse(window.localStorage.getItem('blogs'));
        if (localBlog != null) {
            localBlog.push(blog);
            window.localStorage.setItem("blogs", JSON.stringify(localBlog));
        } else {
            localBlog = [];
            localBlog.push(blog);
            window.localStorage.setItem("blogs", JSON.stringify(localBlog));
        }
        return localBlog;
    };

    $scope.clear = function () {
        $scope.blog = {
            title : '',
            author : '',
            body : ''
        }
    };
});

blogApp.controller('blogCtr', function ($scope){
    $scope.newBlogs = JSON.parse(window.localStorage.getItem('blogs'));
    $scope.formatDate = function (date) {
        let offset = moment().utcOffset();
        let localText = moment.utc(date).utcOffset(offset).format("L LT");
        localText = localText.trim().substring(0, 10) + ' - ' + localText.substring(10,localText.length);
        return localText;
    }
    $scope.goBack = function () {
        location.href = '#/blogInput';
    }
});



