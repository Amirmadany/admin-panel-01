// variables
const sidebar = document.querySelector('.sidebar')
const sidebarItemIcons = document.querySelectorAll('.sidebar-item-icon')
const sidebarItem = document.querySelectorAll('.sidebar-item')
const sidebarMenu = document.querySelector('.sidebar-menu')
const header = document.querySelector('.header')
const backdrop = document.querySelector('.backdrop')
const searchBtn = document.querySelector('.header-nav-item-icon.search')
const searchBox = document.querySelector('.search-box')
const closeSearchBtn = document.querySelector('.header-nav-item-icon.close-search')
const dropdownHasSubItems = document.querySelectorAll('.dropdown-has-sub')
const dropdownMenuAccount = document.querySelector('.dropdown-menu.account')
const accountDropdownBtn = document.querySelector('.header-nav-item-btn-custom')
const notifBtn = document.querySelector('.dropdown-btn')
const notifDropdown = document.querySelector('.dropdown-menu.notif')
const sidebarItemHasSub = document.querySelectorAll('.sidebar-item-content a')
const sidebarSubItems = document.querySelectorAll('.sidebar-item-content')
const subMenuArrowIcons = document.querySelectorAll('.sub-menu-arrow')
const content = document.querySelector('.content')
const subMenuMiniSidebar = document.querySelector('.sub-menu-mini-sidebar')

// eventListeners 
document.addEventListener('DOMContentLoaded', () => {
    changeActiveIconSidebar()

    showSubItemsSidebarInTheTab()

    comeCheckIsMiniSidebarForSetSetting()

})

sidebarItem.forEach(item => {
    item.addEventListener('click', (event) => {

        if(!item.classList.contains('btn-sub')){
            event.preventDefault()

            // remove old active
            if(document.querySelector('.sidebar-item.active'))
                document.querySelector('.sidebar-item.active').classList.remove('active')

            // add active to this tab
            item.classList.add('active')

            // come set new icon for active
            resetActiveIconSidebar()
            changeActiveIconSidebar()

        }
        
    })
})

sidebarMenu.addEventListener('click', () => {
    // responsive menu
    if(window.innerWidth <= 991){

        if(sidebar.classList.contains('show')){
            sidebar.classList.remove('sidebar-mini')
            header.classList.remove('full-header')
            sidebar.classList.remove('show')
            backdrop.classList.remove('show')
        }
        else{
            sidebar.classList.remove('sidebar-mini')
            header.classList.remove('full-header')
            sidebar.classList.add('show')
            backdrop.classList.add('show')
        } 

        content.classList.remove('full-content')

        document.querySelectorAll('.sidebar-items .sidebar-item.btn-sub').forEach((item, index) => {

            item.removeEventListener('mouseleave', hideSidebarTabs)
            item.removeEventListener('mouseover', showSidebarTab)
            
            item.querySelector('.sidebar-item-collapse').classList.remove('d-none')
        
        })

        return
    }

    sidebar.classList.remove('show')
    backdrop.classList.remove('show')

    // larg menu
    toggleFullMenu()
})

backdrop.addEventListener('click', toggleBackdrop)

searchBtn.addEventListener('click', toggleShowSearch)

closeSearchBtn.addEventListener('click', toggleShowSearch)

dropdownHasSubItems.forEach(item => {
    item.addEventListener('click', () => {
        toggleShowSubDropdown(item)
    })
})

accountDropdownBtn.addEventListener('click', () => {
    if(dropdownMenuAccount.classList.contains('show'))
        dropdownMenuAccount.classList.remove('show')
    else
        dropdownMenuAccount.classList.add('show')    
})

document.addEventListener('click', (event) => {
    // if on the each section in the document clicked except dropdownAccount come hide the dropdown
    if(!event.target.closest('.dropdown.account')){
        dropdownMenuAccount.classList.remove('show')
        dropdownHasSubItems.forEach(item => {
            item.querySelector('.dropdown-sub-menu-items').classList.remove('show')
        })
    }

    if(!event.target.closest('.dropdown.notif')){
        // remove all dropdowns menu
        notifDropdown.classList.remove('show')
    }
})

notifBtn.addEventListener('click', () => {
    if(notifDropdown.classList.contains('show'))
        notifDropdown.classList.remove('show')
    else
        notifDropdown.classList.add('show')   
})

sidebarItemHasSub.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault()
    })
})

sidebarSubItems.forEach((item, index) => {

    item.addEventListener('click', () => {    

        // if(!item.parentElement.classList.contains('active')){
        //     if(document.querySelector('.sidebar-item.active') && 
        //        document.querySelector('.sidebar-item.active').firstElementChild != item)
        //         document.querySelector('.sidebar-item.active').classList.remove('active')

        //     subMenuArrowIcons[index].classList.add('show')
        //     item.parentElement.classList.add('active')

        //     // come set new icon for active
        //     resetActiveIconSidebar()
        //     changeActiveIconSidebar()

        // }
        // else {
        //     subMenuArrowIcons[index].classList.remove('show')

        //     if(document.querySelector('.sidebar-item.active'))
        //         document.querySelector('.sidebar-item.active').classList.remove('active')

        //     item.parentElement.classList.remove('active')

        //     // come set new icon for active
        //     resetActiveIconSidebar()
        //     changeActiveIconSidebar()

        // }

        // if(document.querySelector('.sidebar-item.btn-sub .collapse').classList.contains('show')){
        //     var collapseEl = new bootstrap.Collapse(document.querySelector('.sidebar-item.btn-sub .collapse.show'))
        //     collapseEl.toggle()
        // }

        if(!item.classList.contains('active')){
            // if exist another active item-content come remove active
            if(document.querySelector('.sidebar-item-content.active') && 
               document.querySelector('.sidebar-item-content.active') != item){
                    document.querySelector('.sidebar-item-content.active .sub-menu-arrow').classList.remove('show')                   
                    document.querySelector('.sidebar-item-content.active').classList.remove('active')
                }

            // come add active to item-content
            subMenuArrowIcons[index].classList.add('show')
            item.classList.add('active')
                
                resetActiveIconSidebar()
                changeActiveIconSidebar()
        }
        else {
            // change arrow sub-menu to normal style
            subMenuArrowIcons[index].classList.remove('show')
            

            // remove active from item-content-active
            if(document.querySelector('.sidebar-item-content.active')){
                document.querySelector('.sidebar-item-content.active .sub-menu-arrow').classList.remove('show')
                document.querySelector('.sidebar-item-content.active').classList.remove('active')
            }
            
            item.classList.remove('active')

            // come set new icon for active
                resetActiveIconSidebar()
                changeActiveIconSidebar()
        }

        if(document.querySelector('.sidebar-item.btn-sub .collapse').classList.contains('show')){
            var collapseEl = new bootstrap.Collapse(document.querySelector('.sidebar-item.btn-sub .collapse.show'))
            collapseEl.toggle()
        }

    })

})

// functions
function resetActiveIconSidebar(){
    sidebarItemIcons.forEach((item) => {

        const content = item.querySelector('ion-icon').getAttribute('name')
        
        if(content == 'logo-web-component') return

        if(!item.querySelector('ion-icon').getAttribute('name').split('-').includes('outline')){
            item.querySelector('ion-icon').setAttribute('name', content + '-outline')
        }
    })
}

function changeActiveIconSidebar() {
    sidebarItemIcons.forEach((item) => {

        // if dont exist active come back 
        if(!item.parentElement.parentElement.classList.contains('active') &&
            !item.parentElement.parentElement.parentElement.classList.contains('active')){
            return
        }
        
        // come remove the outline from active icon
        let newItem = item.querySelector('ion-icon').getAttribute('name').split('-').map(item => {
            if(item == 'outline')
                item = ''
            return item
        }).join('-')

        if(newItem.slice(newItem.lastIndexOf('-') + 1).length <= 0)
            newItem =  newItem.slice(0, newItem.length - 1)

        // then come set new icon
        item.querySelector('ion-icon').setAttribute('name', newItem)
    })
}

function toggleFullMenu(){

    if(document.querySelector('.sidebar').classList.contains('sidebar-mini')){

        document.querySelector('.sidebar').classList.remove('sidebar-mini')
        document.querySelector('.header').classList.remove('full-header')
        content.classList.remove('full-content')
        

        document.querySelectorAll('.sidebar-items .sidebar-item.btn-sub').forEach((item, index) => {

            item.removeEventListener('mouseleave', hideSidebarTabs)
            item.removeEventListener('mouseover', showSidebarTab)
            
            item.querySelector('.sidebar-item-collapse').classList.remove('d-none')
        
        })

    }
    
    else {

        document.querySelector('.sidebar').classList.add('sidebar-mini')
        document.querySelector('.header').classList.add('full-header')
        content.classList.add('full-content') 

        if(window.innerWidth >= 991){

            document.querySelectorAll('.sidebar-items .sidebar-item.btn-sub').forEach((item, index) => {
                
                // close the sub-menu-in-the-sidebar
                if(document.querySelector('.sidebar-item-content.active ')){
                    document.querySelector('.sidebar-item-content.active .sub-menu-arrow').classList.remove('show')
                    document.querySelector('.sidebar-item-content.active').classList.remove('active')
                    var collapseEl = new bootstrap.Collapse(document.querySelector('.sidebar-item.btn-sub .collapse.show'))
                    collapseEl.toggle()
                    resetActiveIconSidebar()
                    changeActiveIconSidebar()
                }

                item.addEventListener('mouseleave', hideSidebarTabs)
                item.addEventListener('mouseover', showSidebarTab)
    
                item.querySelector('.sidebar-item-collapse').classList.add('d-none')
    
            })

        }

    }
}

function toggleBackdrop(){
    backdrop.classList.remove('show')
    sidebar.classList.remove('show')
}

function toggleShowSearch(){
    if(searchBox.classList.contains('active'))
        searchBox.classList.remove('active')
    else
        searchBox.classList.add('active')
}

function toggleShowSubDropdown(item){

    if(window.outerWidth >= 768) return

    if(document.querySelectorAll('.dropdown-sub-menu-items.show').length >= 1){
        if(document.querySelector('.dropdown-sub-menu-items.show') != item.querySelector('.dropdown-sub-menu-items'))
            document.querySelector('.dropdown-sub-menu-items.show').classList.remove('show')
    }

    if(item.querySelector('.dropdown-sub-menu-items').classList.contains('show'))
        item.querySelector('.dropdown-sub-menu-items').classList.remove('show')
    else
        item.querySelector('.dropdown-sub-menu-items').classList.add('show')

}

function showSubItemsSidebarInTheTab(){
    // do empty
    subMenuMiniSidebar.innerHTML = ''

    document.querySelectorAll('.sidebar-items .sidebar-item.btn-sub').forEach((item, index) => {
        const content = item.querySelector('.sidebar-sub-menu')
        
        subMenuMiniSidebar.innerHTML += `
            <div class="sidebar-tab-pane tab-pane fade" id="li${index + 1}" role="tabpanel" >
            
                <h4 class="sidebar-tab-pane-title my-3"> ${ item.querySelector('.sidebar-item-content .sidebar-item-title').innerHTML } </h4>

                <ul class="tab-content-items list-unstyled fw-normal pb-1 small">

                    ${content.innerHTML}

                </ul>

            </div>
        `
    })
    
    $('.tab-pane#li2').mCustomScrollbar({
        theme: "dark-thin"
    });

    $('.tab-pane#li1').mCustomScrollbar({
        theme: "dark-thin"
    });
}

function hideSidebarTabs(event){
    let button = event.target.querySelector('.sidebar-item-content.active')

    setTimeout(() => {
        
        if(!document.body.closest('.sub-menu-mini-sidebar')){
            subMenuMiniSidebar.classList.remove('active')    
            
            const menu = document.querySelector('.sub-menu-mini-sidebar .tab-pane:hover')

            if(!menu && menu != null){
                menu.classList.remove('show', 'active')                    
            }

            document.querySelectorAll('.sub-menu-mini-sidebar .tab-pane').forEach(item => {
                
                item.addEventListener('mouseleave', (event) => {
                    sidebar.classList.remove('opened')


                    setTimeout(() => {
                        if(button){
                            button.classList.remove('active')
                            resetActiveIconSidebar()
                            changeActiveIconSidebar()
                        }
                    }, 100)
                })

            })


        }

        if(!$('.sub-menu-mini-sidebar').is(':hover')) { 
           if(button){
                button.classList.remove('active')
                resetActiveIconSidebar()
                changeActiveIconSidebar()    
           }        
        }

    }, 500)

}

function showSidebarTab(event){
    subMenuMiniSidebar.classList.add('active')    

    subMenuMiniSidebar.querySelectorAll('.tab-pane').forEach((item, index) => {
        let button

        if(event.target.getAttribute('data-bs-target') == null){

            if(event.target.parentElement.getAttribute('data-bs-target') == null){

                if(event.target.parentElement.parentElement.getAttribute('data-bs-target') == null){
                    if(event.target.parentElement.parentElement.parentElement.getAttribute('data-bs-target'))
                        button = event.target.parentElement.parentElement.parentElement
                }

                else
                    button = event.target.parentElement.parentElement
                
            }
  
            else
                button = event.target.parentElement

        }
        else
            button = event.target

        if(item.id == button.getAttribute('data-bs-target').slice(1)){
            item.classList.add('active')
            item.classList.add('show')

            if(document.querySelector('.sidebar-item-content.active'))
                document.querySelector('.sidebar-item-content.active').classList.remove('active')

            button.classList.add('active')
            resetActiveIconSidebar()
            changeActiveIconSidebar()
        }
        else{
            item.classList.remove('active')
            item.classList.remove('show')
        }

    })

    sidebar.classList.add('opened')
    
}

function comeCheckIsMiniSidebarForSetSetting(){
    if(!sidebar.classList.contains('sidebar-mini')) return

    document.querySelectorAll('.sidebar-items .sidebar-item.btn-sub').forEach((item, index) => {

        document.querySelectorAll('.sidebar-items .sidebar-item.btn-sub').forEach((item, index) => {
            
            item.addEventListener('mouseleave', hideSidebarTabs)
            item.addEventListener('mouseover', showSidebarTab)

            item.querySelector('.sidebar-item-collapse').classList.add('d-none')

        })
    
    })
}

// use jquery for sidebar-content scroll
(function ($) {
    $(window).on("load", function () {

        $(".sidebar-content").mCustomScrollbar({
            theme: "dark-thin"
        });

    });
})(jQuery);

// setting-section-code
const settingButton = document.querySelector('.setting-button')
const settingContent = document.querySelector('.setting-content')
const settingContentCloseBtn = document.querySelector('.setting-content-close-btn')
const darkModeButton = document.querySelectorAll('.checkbox-toggle.dark-mode')

settingButton.addEventListener('click', () => {
    settingContent.classList.toggle('active')
})

settingContentCloseBtn.addEventListener('click', () => {
    settingContent.classList.toggle('active')
})

darkModeButton.forEach(item => {
    item.addEventListener('click', () => {
        document.body.classList.toggle('dark')  
        darkModeButton.forEach(item => {
            if(document.body.classList.contains('dark'))
                item.checked = true
            else
                item.checked = false
        })
    })
})