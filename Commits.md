# i20220502
- better weight name/field @match
- location maxLength @form adedd
- fixed close modal
- empty svg icons added


# i20220421
- better accessibility contrast at match card info
- sass color variables added


# i20220420
- open games & my games API call get results with date filter (future games) with time precision
- create or edit games with prevention & alert for games with past dates input with time precision


# i20220419
- fixed open games's active icon after '/'
- fixed navigate to '/My_games' when close verified modal


# i20220328
- utc format in verified created's game modal fixed
- default active nav-bar button style added
- verified modal transition first effect


# i20220313
- verified modal added when a game is created
- minimalist design


# i20220201
- color buttons
- components with blur filter
- app heigth 100% + 100px


# i20220129
- layouting with z-index
- better contrast


# i20220129
- updated react-router to @6
- focus nav buttons enable (with NavLink)
- 'match' word renamed to 'game'
- unused files removed (App.test.js, etc)


# i20220123
- focus nav buttons disable (to be implemented with a hook)
- form input with right margin (fix mobile modal issue)


# i20220120
- Edit match feature added with React-Modal.
- Hour at form setted 1 hour next
- Grid improved
- Conditional main app fixed
- Fixed memory leak with cleanups useEffect
- Fixed utc date and time


# i20220102
- App 'User cycle' moved to auth/UserId component with context hook
- MatchesPage refactored
- Allmatches service not longer needed
- No longer props for Config component
- Conditionals with ternary operators
- React.StrictMode added
- Match card styled


# i20211218
- conditional router rendering, prevents unauthorized paths


# i20211217
- UseContext hook added to prevent props drilling (playerId/User)
- There is not longer an unauthorized user view, it was replaced by the universal user.
- topbar with front z-index


# i20211215
- README updated
- Commits descriptions added 


# i20211123
- fake login
- empty open/all matches message
- meta logo and info
- font family at html level


# i20211121
- login alert message
- Config title changed for Account title
- Settings icon changed for LogIn icon
- MyMathces icon as layer icon changed for Bookmark icon
- Create match icon changed for Plus icon


# i20211110
- match component with new design
- match component with CSSGrid
- distinct button-action colors
- profile picture as circle


# i20210927
- conditional API matches call
- conditional My_matches (redirects if !user)
- conditional focus nav-button (from child to parent component)
- profile picture
- button animation (transform sizes on click)


# i20210924
- loading spinner v.1
- fixed bug case in open_matches
- adjusted padding-left on match-info


# i20210923
- all_matches typo
- icons typo

# i20210922
- matchs typo everywhere! (matches) FE & BE
- alt icon with title constant
- replaces if with switch case on actionMatchButton
- erase build @ back

# i20210913b
- show all or open match at start depending if user is logged


# i20210913
- deploy front-end on firebase
- .5 more in match border-bottom
- form styles in sass
- disable create @create-match
- design navbar v.1


# i20210906b
- BE and FE with different path
- better router using history 
- links without api-calls
- add_match replaced with create_match
- matchs fetched in match component instead parent (App)
- less props to pass
- constants improved
- title inside component
- "fixed background"
- date-input with now()


# i20210903
- router added
- form component added
- no innecesary api requests
- declarations & classNames improved
- const declarations on constants module
- form name-label deleted


# i20210830
- better declaration names (const, lets)
- rechanged loged to logged (false typo)
- make a baseUrl in FE


# i20210829.1
- get allMatchs if user is not loged
- change logged to loged
- better profile border


# i20210829
- change left to leave on DB and BE
- form: action buttons and input border with primary-color
- form & match containers with better borders
- background gradient grey


# i20210827

+ matchPage's actions comunication beetwen props and state IMPORTANT!
+ form: action container added margin-top: 40px
+ form: action button width: 96px
+ form: white color on input-types pickers
+ padding-top on nav-bar
+ better navigation create-match icon
+ resolve background cover (changing size)
+ delete initialized msg on open_matchs


# i202010822
- matchsbox blured
- players numbers more minimal
- background at index.html
- css files erased (except form.css)
- "leave" instead "left" button
- navigation icons added
- match actions on match component


# i202010601
---------------
FRONT
-	LOGIN lost after reload.
	-	localstorage?
-	hq logo -> replaced with real characters 
-	meta info in index
---------------
CSS
	At match:
-	padding-bottom between matchs
-	action-buttons wider
-	date with more size


# i202010530
---------------
FRONT
-	SAVE locations and names used by player-admin

-	replace react favicons
-	hq logo
----------------
CSS
	At CreateMatch, 
-		Date inputs need titles.
-		Input labels and subtitles need more size.

-	Navar links have little top-border padding at focus.
-	Config focus it's not necessary. 

	At matchs: 	
-		date, title and location need more size.
-		info field can be at bottom of players.
-		date line with full width