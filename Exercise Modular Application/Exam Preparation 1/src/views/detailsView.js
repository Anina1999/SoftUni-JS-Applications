import { navigation } from "../navigation/navigation.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { api } from '../api/api.js';
import { auth } from "../authentication/authService.js";
import page from '../../node_modules/page/page.mjs';

export const detailsTemplate = (solution, likeCount, isOwner, showLikeButton, onEdit, onDelete, onLike) => html`
        <section id="details">
          <div id="details-wrapper">
            <img
              id="details-img"
              src=${solution.imageUrl}
              alt=${solution.type}
            />
            <div>
              <p id="details-type">${solution.type}</p>
              <div id="info-wrapper">
                <div id="details-description">
                  <p id="description">
                    ${solution.description}
                  </p>
                  <p id="more-info">
                    ${solution.moreInfo}
                  </p>
                </div>
              </div>
              <h3>Like Solution:<span id="like">${likeCount}</span></h3>

              <!--Edit and Delete are only for creator-->
              <div id="action-buttons">
                ${isOwner ? html`
                <a href="#" id="edit-btn" @click=${onEdit}>Edit</a>
                <a href="#" id="delete-btn" @click=${onDelete}>Delete</a>
                ` : showLikeButton
              ? html`
                <a href="#" id="like-btn" @click=${onLike}>Like</a>
                ` : ''}
              </div>
            </div>
          </div>
        </section>
        `

export async function showDetails(context) {
    const solutionId = context.params.id;
    const main = document.querySelector('main');
    navigation().update();

    try {
        const solution = await api.get(`/data/solutions/${solutionId}`);

        const userId = auth.getUserId();
        const isOwner = userId === solution._ownerId;

        const likeCount = await api.get(
            `/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`
        );

        let showLikeButton = false;

        if (userId && !isOwner) {
            const userLiked = await api.get(
                `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22`
            );

            showLikeButton = userLiked.length === 0;
        }

        const onEdit = (e) => {
            e.preventDefault();
            page.redirect(`/edit/${solutionId}`);
        };

        const onDelete = async (e) => {
            e.preventDefault();
            if (confirm("Are you sure you want to delete this solution?")) {
                await api.authenticatedDELETE(`/data/solutions/${solutionId}`);
                page.redirect('/solutions');
            }
        };

        const onLike = async (e) => {
            e.preventDefault();
            await api.authenticatedPOST(`/data/likes`, { solutionId });
            page(`/solutions/${solutionId}`);
        };

        render(
            detailsTemplate(
                solution,
                likeCount,
                isOwner,
                showLikeButton,
                onEdit,
                onDelete,
                onLike
            ),
            main
        );

    } catch (error) {
        alert(error.message);
    }
}