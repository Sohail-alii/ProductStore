import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { syncUser } from "../lib/api";

import React from 'react';

function useUserSync() {
    const { isSignedIn } = useAuth();
    const { user } = useUser();

    const { mutate: syncUserMutation, isPending, isSuccess } = useMutation({
        mutationFn: syncUser,
    });

    useEffect(() => {
        if(isSignedIn && user && !isPending && !isSuccess) {
            console.log("this part is run")
            syncUserMutation({
                email: user.primaryEmailAddress.emailAddress,
                name: user.fullName || user.firstName,
                imageUrl: user.imageUrl,
            });
        }
    }, [ isSignedIn, user, syncUserMutation, isPending, isSuccess ]);

  return {isSynced: isSuccess};
}

export default useUserSync;
