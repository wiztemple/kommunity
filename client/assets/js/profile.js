document.onreadystatechange = async function getUser() {
  if (document.readyState === 'complete') {
    const url = '/api/v1/auth/users/profile';
    const token = localStorage.getItem('token');
    const email = document.getElementById('email');
    const username = document.getElementById('username');
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.status === 'success') {
        const cardProfile = document.getElementById('cardProfile');
        const userDetails = result.user;
        cardProfile.innerHTML = `
            <div class="profile-card p-1">
                <div class="profile-card__image">
                    <img src="./assets/images/boy.png" class="img-circle">
                </div>
                <div class="profile-card__user">
                    <h2 class="text-center" id="username">${userDetails.username}</h2>
                </div>
                <div class="profile-card__user-details">
                    <span id="email">${userDetails.email}</span>
                </div>
                <div class="profile-card__user-details">
                    <span>Number of Question asked:</span> <span>100</span>
                </div>
                <div class="profile-card__user-details">
                    <span>Number of Question answered:</span> <span>130</span>
                </div>
                <div class="profile-card__user-details">
                    <span>Questions asked with most answers:</span> <span>10</span>
                </div> 
            </div>
        `;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
};
