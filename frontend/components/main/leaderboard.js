function leaderboard(){


    return` <article class="p-1 leaderboard-container flex" >
                <div class="leaderboard flex flex-col gap-2 items-start flex-1">
                <h1 class="page-title w-full">Leaderboard</h1>

                <div class="flex w-full gap-1 flex-wrap">
                    <select id="subjectSelect" class="">
                    <option value="1">Classic</option>
                    <option value="2">Amazing</option>
                    <option value="3">Marvel Cinematic Universe</option>
                    <option value="4">Spiderverse</option>
                    </select>

                    <input id="searchInput" class="flex-1 p-1" placeholder="Search..."/>
                </div>
                
                <ol id="leaderboardList" class="leaderboard-list w-full flex flex-col">
                    <!-- Leaderboard items will be populated here -->
                </ol>
                </div>
            </article>`
}

export default leaderboard;