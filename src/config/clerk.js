export const clerkConfig = {
    appearance: {
        theme: {
            primaryColor: '#06b6d4',
        },
        elements: {
            formButtonPrimary: 'bg-cyan-500 hover:bg-cyan-600',
            modalCloseButton: 'text-white hover:text-cyan-400',
            card: 'bg-[#13171f] border border-gray-800',
            headerTitle: 'text-white',
            headerSubtitle: 'text-gray-400',
            socialButtonsBlockButton: 'border border-gray-700 hover:border-gray-600',
            formFieldLabel: 'text-gray-300',
            formFieldInput: 'bg-[#0a0d12] border-gray-700 text-white',
            footerActionText: 'text-gray-400',
            footerActionLink: 'text-cyan-400 hover:text-cyan-300',
        },
    },
    signIn: {
        appearance: {
            elements: {
                rootBox: 'bg-[#0a0d12]',
                card: 'bg-[#13171f] border border-gray-800',
            },
        },
    },
    signUp: {
        appearance: {
            elements: {
                rootBox: 'bg-[#0a0d12]',
                card: 'bg-[#13171f] border border-gray-800',
            },
        },
    },
};

export const socialConnections = [
    'oauth_google',
    'oauth_linkedin_oidc'
];
