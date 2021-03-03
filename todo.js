
    let get_all_books = document.querySelector('#section');
    let chkdarr = [];
    var bookid = [];
    let temp_id = []; //temp var to store books for deltion from storage and data retrieval
    // const storedata = [];
    get_all_books.addEventListener
    ('click',function(btn)
        {
//delete single item
           if(btn.target.className.search(/delete | delete | delete|delete/) >= 0)
           {
                var elbox  = btn.target.parentElement.querySelector(".chk");
                //for deletion from local storage
                temp_id.push(btn.target.parentElement.querySelector(".span .identity").textContent);
                
                if(elbox.checked == true)
                {
                    var a = 0;
                    var temp = chkdarr[(chkdarr.length) - 1]
                    chkdarr.pop();
                    console.log("last element poped and stored")
                    while(a<chkdarr.length)
                    {
                        if(chkdarr[a] === elbox)
                        {
                            chkdarr[a] = temp;
                            break;
                        }
                        a++;
                    }
                }
                btn.target.parentElement.remove();
           }
//show delete button on click on checkbox
            
            if(btn.target.className.search(/chk | chk | chk|chk/) >= 0)
           {
               if(btn.target.checked === true) 
               {
                    chkdarr.push(btn.target);
                    console.log("element inserted ",btn.target);
               }
               else
               {
                    if(btn.target === chkdarr[(chkdarr.length)-1])
                    {
                        chkdarr.pop();
                        console.log("last element poped ",btn.target);
                    }
                    else
                    {
                       var a = 0;
                       var temp = chkdarr[(chkdarr.length) - 1]
                       chkdarr.pop();
                       console.log("last element poped and stored")
                       while(a<chkdarr.length)
                       {
                            if(chkdarr[a] === btn.target)
                            {
                                chkdarr[a] = temp;
                                console.log("last element ",chkdarr[a]," stored at this place "+a)
                            }
                            a++;
                       }
                   }
               }
           }
           if(chkdarr.length<=0)
           {
               document.getElementById('chkbtn').style.display='none';
           }
           else
           {
            document.getElementById('chkbtn').style.display='inline-block';
           }
// no tasks empty item display
           if (btn.target.className.search(/delete| delete| delete |delete /) > 0 || btn.target.id === 'chkbtn')
           {
                var arr = [];
                document.querySelectorAll("#section .boook").forEach(function(el){
                    arr.push(el);
                })
                if (arr.length === 0)
                {
                     document.querySelector(".empty").style.display = "flex";
                    
                }
           }
// select all items on button press
           if(btn.target.id === "all"){
            //    document.querySelector(".chk").checked = true;
            if(document.querySelector("#section .boook")){
                document.getElementById('chkbtn').style.display='inline-block';
               var len = chkdarr.length;
               chkdarr.length = 0; 
               document.querySelectorAll(".chk").forEach(function(el){
                chkdarr.push(el);
                el.checked = true;
                })
            }
            else{
                alert("no tasks to select")
            }
           }
      
// deleting checked items  
            if(btn.target.id === "chkbtn"){
                var b=chkdarr.length;
                while(b>0){
                    //for deletion from local storage multiple items
                    var ibook = chkdarr[b-1].parentElement.querySelector(".span .identity").textContent;
                    var rep = 0;
                    temp_id.forEach(function(i){
                        if(i==ibook){
                            rep++;
                        }
                    })
                    if(rep===0){
                        temp_id.push(ibook);
                    }
                    chkdarr[b-1].parentElement.remove();
                    chkdarr.pop();
                    b--;
                    console.log(chkdarr);
                }
                document.getElementById('chkbtn').style.display='none';
            }
//inserting new book in DOM when create_book button pressed
        if(btn.target.className.search(/btn| btn| btn |btn /)>=0 && btn.target.parentElement.id === "create_book"){
            
            let booknam = document.getElementById('book_name').value;
            booknam = booknam.trim();
            if(booknam!='')
            {
                console.log("not blank");
                //generating/inserting the identity of the book inside span
                var book = bookSkeleton();
                if(bookid.length === 0){
                    var a = "t0"
                    bookid.push(a);
                    book.querySelector(".span .identity").textContent = a;
                }
                else{
                    var a = 0;
                    var b = "";
                    a = (bookid[(bookid.length)-1].slice(1));
                    a=parseInt(a)+1;
                    b = "t"+a.toString();
                    bookid.push(b);
                    book.querySelector(".span .identity").textContent = b;
                }
                //inserting bookname inside the span
                book.querySelector(".span .identity").insertAdjacentText("beforebegin",booknam);
                //inserting the book inside the DOM
                var arr = [];
                document.querySelectorAll("#section .boook").forEach(function(el){
                    arr.push(el);
                })
                if (arr.length === 0)
                {
                    document.getElementById("htext").insertAdjacentElement("afterend",book);
                    document.querySelector(".empty").style.display = "none";
                }
                else{
                    document.getElementById("htext").insertAdjacentElement("afterend",book);
                }
            }
            else{
                console.log("blank");
                alert("Bookname cannot be blank");
            }
                document.getElementById('book_name').value ='';
        }

//ADDING/DELETING DATA TO LOCAL STORAGE
    //adding the books to local storage
        if(btn.target.className.search(/btn| btn| btn |btn /)>=0 && btn.target.parentElement.id === "create_book"){
            document.querySelectorAll("#section .boook").forEach(function(el){
                var book_id = el.querySelector(".span .identity").textContent;
                var book_nam = "";
                book_nam = el.querySelector(".span").textContent;
                book_nam = book_nam.slice(0,(book_nam.lastIndexOf(`${book_id}`)));
                localStorage.setItem(`${book_id}`,`{ "book_id" : "${book_id}","book_nam" : "${book_nam}"}`);
            })
        }
    //deleting single book on press of single book delete button from local storage
        if(btn.target.className.search(/delete | delete | delete|delete/) >= 0){
            var delitem = temp_id.pop();
            localStorage.removeItem(`${delitem}`);
        }
    //deleting multiple items from local storage
        if(btn.target.id === "chkbtn"){
            temp_id.forEach(function(r){
                localStorage.removeItem(`${r}`);
            })
        }
    });

// creating book skeleton
    function bookSkeleton(){
        let bookel = document.createElement('div');
        let chkel = document.createElement('input');
        let spanel = document.createElement('span');
        let identity = document.createElement('span');
        let deleteel = document.createElement('button');
        bookel.setAttribute("class","boook");
        chkel.setAttribute("type","checkbox");
        chkel.setAttribute("class","chk")
        spanel.setAttribute("class","span");
        identity.setAttribute("class","identity");
        deleteel.setAttribute("class","btn delete");
        bookel.appendChild(chkel);
        bookel.appendChild(spanel);
        bookel.appendChild(deleteel);
        spanel.appendChild(identity);
        deleteel.textContent='Delete';
        return bookel;
    }

//JAVASCRIPT IMPLENTED CSS
//book highliting CSS
get_all_books.addEventListener('mouseover',
function(frame){
    
        if(frame.target.className.search(/chk | chk | chk|chk|span| span|span | span |delete | delete | delete|delete/) >= 0)
        {
            frame.target.parentElement.style.borderLeft = "blue solid 5px";
            frame.target.parentElement.style.borderBottom = "blue solid 1px";
            // console.log("csd in ",frame);
        }
        else if(frame.target.className.search(/boook|boook | boook| boook /) >= 0)
        {
            frame.target.style.borderLeft = "blue solid 5px";
            frame.target.style.borderBottom = "blue solid 1px";
            // console.log("boook in ",frame);
        }
})
//book unhighlight CSS
get_all_books.addEventListener('mouseout',
function(frame){
        if(frame.target.className.search(/chk | chk | chk|chk|span| span|span | span |delete | delete | delete|delete/) >= 0)
        {
            frame.target.parentElement.style.borderLeft = "rgb(179, 172, 204) solid 5px";
            frame.target.parentElement.style.borderBottom = "none";
        }
        else if(frame.target.className.search(/boook|boook | boook| boook /) >= 0)
        {
            frame.target.style.borderLeft = "rgb(179, 172, 204) solid 5px";
            frame.target.style.borderBottom = "none";
        }
})

//retrieving data from local storage
window.onload = function(){
    Object.keys(localStorage).forEach(function(b){
        // console.log(JSON.parse(localStorage.getItem(b)).book_id," ",JSON.parse(localStorage.getItem(b)).book_nam);
        if(b.slice(0,1)==="t" && parseInt(b.slice(1)) == b.slice(1)){
          var bi =  JSON.parse(localStorage.getItem(b)).book_id;
          var bn = JSON.parse(localStorage.getItem(b)).book_nam;
          var bs = bookSkeleton();
          //inserting book id inside span and bookid array
          bookid.push(bi);
          bs.querySelector(".span .identity").textContent = bi;
          //inserting bookname inside the span
          bs.querySelector(".span .identity").insertAdjacentText("beforebegin",bn);
          //inserting the book inside the DOM
          var arr = [];
          document.querySelectorAll("#section .boook").forEach(function(el){
              arr.push(el);
          })
          if (arr.length === 0)
          {
              document.getElementById("htext").insertAdjacentElement("afterend",bs);
              document.querySelector(".empty").style.display = "none";
          }
          else{
              document.getElementById("htext").insertAdjacentElement("afterend",bs);
          }
        } 
        // console.log(bi,' ',bn);
    })
    
}
function initclick(){}
document.addEventListener("keypress",function(e){
    if(e.charCode === 13 && document.querySelector("#create_book input").value != ''){
        eventFire(document.querySelector("#create_book .btn"),"click");
    }
})
//on press enter input is taken
function eventFire(el, etype){
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }




    