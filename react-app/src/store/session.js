// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_ALL_USERS = "session/GET_ALL_USERS";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const actionGetAllUsers = (users) => ({
	type: GET_ALL_USERS,
	users
})



export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (firstName, lastName, email, education, city, state, country, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			first_name: firstName,
			last_name: lastName,
			email,
			education,
			city,
			state,
			country,
			password
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export const thunkGetAllUsers = () => async (dispatch) => {
	const response = await fetch(`/api/users/`)

	if (response.ok) {
		const users = await response.json()
		const normalizedUsers = {}
		users.forEach(user => {
			normalizedUsers[user.id] = user
		})
		// console.log("normalized Users: ", normalizedUsers)
		dispatch(actionGetAllUsers(normalizedUsers))
		return normalizedUsers
	}
}

const initialState = {
	user: null,
	allUsers: {}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case GET_ALL_USERS: {
			const newState = {...state}
			newState.user = {...state.user}
			newState.allUsers = { ...action.users}
			return newState
			// return { user: ...state.user, users: ...action.users }
		}
		default:
			return state;
	}
}
