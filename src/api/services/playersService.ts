import { ApiResponse } from "@/types/ApiResponse";
import { ErrorResponse } from "@/types/ErrorReponse";
import { Player } from "@/types/Player";
import { PlayerCarrerStats } from "@/types/PlayerCarrerStats";
import { PlayerInfo } from "@/types/PlayerInfo";
import axios, { AxiosError } from "axios";
import api from "..";

const get_players = async (is_active?: boolean | true, player_name?: string, limit?: number, page?: number, pageSize?: number): Promise<ApiResponse<Player[]>> => {
    const params = new URLSearchParams();

    try {
        if (is_active) params.append("is_active", is_active.toString());
        if (player_name) params.append("player_name", player_name);
        if (limit) params.append("limit", limit.toString());
        if (page) params.append("page", page.toString());
        if (pageSize) params.append("pageSize", pageSize.toString());

        const response = await api.get(`/players?${params.toString()}`);
        return {
            success: true,
            data: response.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.details
                };
            }
        }
    }
    return {
        error: "Internal server error"
    }
}

const get_player_info = async (player_id?: number, player_name?: string): Promise<ApiResponse<PlayerInfo>> => {
    const params = new URLSearchParams();

    try {
        if (player_id) params.append("player_id", player_id.toString());
        if (player_name) params.append("player_name", player_name);

        const response = await api.get("/players/player/info", { params: params });

        console.log(response.data)
        return {
            success: true,
            data: response.data[0]
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.details
                };
            }
        }
    }
    return {
        error: "Internal server error"
    }
}

const get_players_carrer_stats = async (player_id?: number | string, regular_season?: boolean, post_season?: boolean, season?: string, page?: number, pageSize?: number): Promise<ApiResponse<PlayerCarrerStats[]>> => {
    const params = new URLSearchParams();

    try {
        if (regular_season) params.append("regular_season", regular_season.toString());
        if (post_season) params.append("post_season", post_season.toString());
        if (season) params.append("season", season.toString());
        if (page) params.append("page", page.toString());
        if (pageSize) params.append("pageSize", pageSize.toString());

        const response = await api.get(`players/carrer_stats/totals/${player_id}`, { params: params });
        return {
            success: true,
            data: response.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.details
                };
            }
        }
    }
    return {
        error: "Internal server error"
    }
}

export {
    get_player_info, get_players,
    get_players_carrer_stats
};

