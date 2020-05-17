declare type GeneralOptions = {
    token: string;
    owner: string;
    repo: string;
    issue_number: number;
};
declare type ReplaceCommentOptions = GeneralOptions & {
    body: string;
};
declare type DeleteCommentOptions = GeneralOptions & {
    startsWith: string;
};
export declare const deleteComment: ({ token, owner, repo, issue_number, startsWith }: DeleteCommentOptions) => Promise<void>;
export default function replaceComment({ token, owner, repo, issue_number, body }: Readonly<ReplaceCommentOptions>): Promise<import("@octokit/types").OctokitResponse<{
    id: number;
    node_id: string;
    url: string;
    html_url: string;
    body: string;
    user: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    };
    created_at: string;
    updated_at: string;
}>>;
export {};
