blogApp.directive('comment', function () {
    return {
        restrict: 'E',
        link : function (scope, elem, attrs) {
            scope.comments = [];
            scope.btn_post = function() {
                if (scope.cmtName != '' && scope.cmtName.trim() != null) {
                    scope.comments.push(scope.cmtName);
                    scope.cmtName = '';
                }
            }
            scope.post_cmt = function($home) {
                scope.comments.splice($home, 1);
            }

        },
        templateUrl : './components/comment/comment.html'

    }
})