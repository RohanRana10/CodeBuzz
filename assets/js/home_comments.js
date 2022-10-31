// {
//     console.log(`Hello from comments.js`);

//     let createComment = function(e){
//         let newCommentFrom = $('#comment-form');
//         // console.log(newCommentFrom);
//         newCommentFrom.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type: 'post',
//                 url: '/comments/create',
//                 data: newCommentFrom.serialize(),
//                 success: function(data){
//                     console.log(data);
//                     let newComment = newCommentDOM(data.data.comment);
//                     $('#post-comments-list>ul').prepend(newComment);
//                 },
//                 error: function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         });
//     }
//     //method to create comment in DOM
//     let newCommentDOM = function(comment){
//         return $(`
//                 <li id="comment-${comment._id}">
//                     <p>
//                         <div id="user-name">
//                         ${comment.user.name}
//                         </div>
//                             <small id="delete-button">
//                                 <a class="delete-comment-button" href="/comments/destroy/${comment._id}"><i class="fa-regular fa-trash-can"></i></a>
//                             </small>
//                             ${comment.content}
//                     </p>
//                 </li>
//         `);
//     }

//     createComment();
// }