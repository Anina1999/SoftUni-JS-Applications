import { dataService } from '../service/dataService.js';
import { html, nothing, renderer } from '../utility/library.js';
import { userUtils } from '../utility/userUtils.js';

const temp = (hasUser, data) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    ${hasUser ? html`
    <article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>`
    : nothing}
    ${data.map(team => teamTemp(team))}

</section>
`

const teamTemp = (team) => html`
    <article class="layout">
        <img src=${team.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${team.name}</h2>
            <p>${team.description}</p>
            <span class="details">${team.memberCount} Members</span>
            <div><a href="/details/${team._id}" class="action">See details</a></div>
        </div>
    </article>
    `

export async function showBrowseTeamsView(ctx) {
    const hasUser = userUtils.getUserId();
    const data = await dataService.getAllTeams();
    const allUser = await dataService.getAllMembers();
    data.forEach(team => {
        const memberCount = getMemberCountByTeam(allUser, team._id);
        team.memberCount = memberCount;
    });
    renderer(temp(hasUser, data));
}

function getMemberCountByTeam(memberList, teamId) {
    return memberList.filter(member => member.teamId === teamId && member.status === 'member').length;
}