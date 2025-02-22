const db = require('../db');

class Match {
    constructor(idmatch, dateMatch, lieuMatch, scoreEquipeA, scoreEquipeB, idSaison) {
        this.idmatch = idmatch;
        this.dateMatch = dateMatch;
        this.lieuMatch = lieuMatch;
        this.scoreEquipeA = scoreEquipeA;
        this.scoreEquipeB = scoreEquipeB;
        this.idSaison = idSaison;
    }

    // Méthode pour récupérer un match par son ID
    static async getMatchById(id) {
        try {
            const result = await db.query('SELECT * FROM public.match WHERE idmatch = $1', [id]);
            if (result.rows.length > 0) {
                const matchData = result.rows[0];
                return new Match(
                    matchData.idmatch,
                    matchData.datematch,
                    matchData.lieumatch,
                    matchData.scoreequipea,
                    matchData.scoreequipeb,
                    matchData.idsaison
                );
            } else {
                throw new Error('Match non trouvé');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du match:', error);
            throw new Error('Erreur lors de la récupération du match');
        }
    }

    static async getMatchsParSaison(idSaison) {
        try {
            const result = await db.query('SELECT * FROM public.match WHERE idsaison = $1', [idSaison]);
            return result.rows.map(matchData =>
                new Match(
                    matchData.idmatch,
                    matchData.datematch,
                    matchData.lieumatch,
                    matchData.scoreequipea,
                    matchData.scoreequipeb,
                    matchData.idsaison
                )
            );
        } catch (error) {
            console.error('Erreur lors de la récupération des matchs:', error);
            throw new Error('Erreur lors de la récupération des matchs');
        }
    }

    // Méthode pour créer un nouveau match
    static async createMatch(dateMatch, lieuMatch, scoreEquipeA, scoreEquipeB, idSaison) {
        try {
            const result = await db.query(
                'INSERT INTO public.match (datematch, lieumatch, scoreequipea, scoreequipeb, idsaison) VALUES ($1, $2, $3, $4, $5) RETURNING idmatch',
                [dateMatch, lieuMatch, scoreEquipeA, scoreEquipeB, idSaison]
            );
            return new Match(
                result.rows[0].idmatch,
                dateMatch,
                lieuMatch,
                scoreEquipeA,
                scoreEquipeB,
                idSaison
            );
        } catch (error) {
            console.error('Erreur lors de la création du match:', error);
            throw new Error('Erreur lors de la création du match');
        }
    }

    // Méthode pour supprimer un match
    static async deleteMatch(idmatch) {
        try {
            const result = await db.query('DELETE FROM public.match WHERE idmatch = $1 RETURNING *', [idmatch]);
            if (result.rows.length === 0) {
                throw new Error('Match non trouvé');
            }
            return `Match ${idmatch} supprimé avec succès`;
        } catch (error) {
            console.error('Erreur lors de la suppression du match:', error);
            throw new Error('Erreur lors de la suppression du match');
        }
    }
}

module.exports = Match;
