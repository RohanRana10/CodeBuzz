{
    // console.log(`hello`);

    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDOM(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button',newPost));
                    showNoty('Post Created','success');
                    // console.log(data);
                },error: function(error){
                    console.log(error.responseText);
                    showNoty('Error in creating post','error');
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDOM = function(post){
        return $(`
                <li id="post-${post._id}">
                <div id="post-content">
                    <small id="delete-button">
                        <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fa-regular fa-trash-can"></i></a>
                    </small>
                    <div id="user-name">
                        ${post.user.name}
                    </div>
                    <div id="content">
                        ${post.content}
                    </div>
                </div>
                
                    <div class="post-comments">
                        <form action="/comments/create" method="post" id="comment-form">
                            <input type="text" name="content" id="comment-box" placeholder="Add Comment.." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Comment" id="submit-comment">
                        </form>
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                                
                            </ul>
                        </div>
                    </div>
            </li>
        `);
    }


    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    showNoty('Post and associated comments deleted','success');
                },error: function(error){
                    console.log(error.responseText);
                    showNoty('Error in deleting post','error');
                }
            });
        });
    }

    let addDyanmicDeletion = function(){
        var listItems = $("#post-list-container li");
        for (let li of listItems) {
            let post = $(li);
            deletePost($('.delete-post-button',post));
        }
    }

    let showNoty = function(text,type){
        new Noty({
            theme: 'sunset',
            text: text,
            type: type,
            layout: 'bottomRight',
            timeout: 1500,
        }).show();
    }

    addDyanmicDeletion();
    createPost();
}