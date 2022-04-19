import createRepository from "~/api/Repository.js";

export default function(context, inject) {
    const api = createRepository(context);
    const authUrl = 'https://api.pana.kz/auth/v1/';
    const b2bUrl = "https://api.pana.kz/pms/"
        // const profileUrl = process.env.profilePageUrl;
    const repositories = {
      auth: {
        registration: api("signup", "POST", authUrl),
        login: api("token/email", "POST", authUrl),
        restore: {
          ...api("restore/", "POST", authUrl),
          ...api("restore/", "PUT", authUrl),
        },
        changePassword: api("change/password/", "POST", authUrl),
      },
      profile: {
        ...api("user/", "GET", b2bUrl),
        ...api("user/", "POST", b2bUrl),
        ...api("user/", "PUT", b2bUrl),
      },
      regions : {
        countries: api("countries/", "GET", authUrl),
        cities: api("cities/", "GET", authUrl)
      },
      hotel: {
        allInfo: api("hotel", "GET", b2bUrl),
        list: api("hotels/", "GET", b2bUrl),
        create: api("hotels/", "POST", b2bUrl),
        remove: api("hotels/detail/", "DELETE", b2bUrl),
        main: {
          ...api("hotels/main/", "GET", b2bUrl),
          ...api("hotels/main/", "PUT", b2bUrl),
        },
        convenience: {
          ...api("hotels/convenience/", "GET", b2bUrl),
          ...api("hotels/convenience/", "POST", b2bUrl),
        },
        image: api("image", "POST", b2bUrl),
        images: {
          ...api("hotels/images/", "GET", b2bUrl),
          ...api("hotels/images/", "POST", b2bUrl),
          ...api("hotels/images/", "DELETE", b2bUrl),
        },
        payment: {
          ...api("hotels/payment/", "GET", b2bUrl),
          ...api("hotels/payment/", "POST", b2bUrl),
        },
        rules: {
          ...api("hotels/rules/", "GET", b2bUrl),
          ...api("hotels/rules/", "POST", b2bUrl),
        },
        services: {
          ...api("hotels/services/", "GET", b2bUrl),
          ...api("hotels/services/", "POST", b2bUrl),
          ...api("hotels/services/", "DELETE", b2bUrl),
        },
        facilities: {
          ...api("hotels/room/types/", "GET", b2bUrl)
        },
        rooms:{
          ...api("rooms/", "GET", b2bUrl)
        }
      },
      room: {
        detail: {
          ...api("rooms/detail", "GET", b2bUrl),
          ...api("rooms/detail", "PUT", b2bUrl),
          ...api("rooms/detail", "DELETE", b2bUrl)
        }
      },
      dictionary: {
        services: api("hotels/services/types/", "GET", b2bUrl),
        subcategories: api("subcategory/", "GET", b2bUrl),
        countries: api("countries/", "GET", authUrl),
        cities: api("countries/8/cities/", "GET", authUrl),
        languages: api("languages/", "GET", b2bUrl),
        breakfasts: api("hotels/breakfast/", "GET", b2bUrl),
      },
      rooms: {
        getServices: {
          ...api(
            "rooms/services/", "GET",b2bUrl,false)
        }
      },
      getRoom:{
        ...api("rooms/", "GET", b2bUrl, false)
      },
        getHotels: {
            ...api(
                "hotels/", "GET", b2bUrl, false)
        },
      getHotel: {
        ...api(
          "hotels/detail/", "GET", b2bUrl, false)
      },

        creatingHotel: {
            ...api(
                "hotels/", "POST", b2bUrl, false)
        },

        sendingAdditionalHotelData: {
            ...api(
                "hotel", "PUT", b2bUrl, false)
        },

        getServices: {
            ...api(
                "services/", "GET", b2bUrl, false)
        },

        getRoomTypes: {
            ...api(
                "rooms/types/", "GET", b2bUrl, false)
        },

        getBedTypes: {
            ...api(
                "rooms/beds/", "GET", b2bUrl, false)
        },

        creatingRoom: {
            ...api(
                "rooms/", "POST", b2bUrl, false)
        },
        categories:{
          ...api(
            "hotels/category/", "GET", b2bUrl, false)
        },
        subcategories:{
          ...api(
            "hotels/subcategory/", "GET",b2bUrl,false)
        },
        breakfast:{
          ...api(
            "hotel/breakfast","GET",b2bUrl,false
          )
        },
        languages:{
        ...api(
          "languages/","GET",b2bUrl,false
        )
      },
        services:{
          ...api("services/","GET",b2bUrl,false)
        }
    };

    inject('api', repositories);
}
