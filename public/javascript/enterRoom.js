$(document).ready(function(){
   $('.nav a:contains("Rooms")').addClass('active');
   console.log("enter room running");
   $("a").click(function(){
      var url = $(this).attr("href");
      var profID = $("select").val();
      window.location.replace(url+"&profileID="+profID);
      return false;
   });


});